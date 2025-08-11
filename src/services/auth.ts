import { supabase } from '@/lib/supabase';
import { LoginCredentials, RegisterData, User } from '@/types/auth';

export class AuthService {
  // Sign up with email and password
  async signUp(data: RegisterData): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            role: data.role,
            phone: data.phone,
            location: data.location,
          }
        }
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (authData.user) {
        const user: User = {
          id: authData.user.id,
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone || '',
          location: data.location || '',
          avatar: undefined,
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        return { user, error: null };
      }

      return { user: null, error: 'Sign up failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Sign in with email and password
  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (authData.user) {
        // Get user profile from Supabase
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          // Create user profile if it doesn't exist
          const userData = {
            id: authData.user.id,
            email: authData.user.email!,
            full_name: authData.user.user_metadata?.full_name || 'User',
            role: authData.user.user_metadata?.role || 'farmer',
            phone: authData.user.user_metadata?.phone || '',
            location: authData.user.user_metadata?.location || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          await supabase.from('users').insert(userData);
        }

        const user: User = {
          id: authData.user.id,
          name: authData.user.user_metadata?.full_name || profile?.full_name || 'User',
          email: authData.user.email!,
          role: authData.user.user_metadata?.role || profile?.role || 'farmer',
          phone: authData.user.user_metadata?.phone || profile?.phone || '',
          location: authData.user.user_metadata?.location || profile?.location || '',
          avatar: undefined,
          createdAt: new Date(profile?.created_at || Date.now()),
          lastLogin: new Date(),
        };

        return { user, error: null };
      }

      return { user: null, error: 'Sign in failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Sign in with Google OAuth
  async signInWithGoogle(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        return {
          id: user.id,
          name: profile.full_name,
          email: user.email!,
          role: profile.role,
          phone: profile.phone || '',
          location: profile.location || '',
          avatar: undefined,
          createdAt: new Date(profile.created_at),
          lastLogin: new Date(),
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { user: null, error: 'User not authenticated' };
      }

      const updateData = {
        full_name: updates.name,
        role: updates.role,
        phone: updates.phone,
        location: updates.location,
        updated_at: new Date().toISOString(),
      };

      const { data: profile, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      const updatedUser: User = {
        id: user.id,
        name: profile.full_name,
        email: user.email!,
        role: profile.role,
        phone: profile.phone || '',
        location: profile.location || '',
        avatar: undefined,
        createdAt: new Date(profile.created_at),
        lastLogin: new Date(),
      };

      return { user: updatedUser, error: null };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  }

  // Get auth session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

// Export singleton instance
export const authService = new AuthService(); 