import { LoginCredentials, RegisterData, User } from '@/types/auth';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  profile: '/auth/profile',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
};

// Demo user data
const DEMO_USERS: Record<string, User> = {
  'farmer@agribot.com': {
    id: '1',
    name: 'Demo Farmer',
    email: 'farmer@agribot.com',
    role: 'farmer',
    phone: '+233 20 123 4567',
    location: 'Kumasi, Ashanti Region',
    avatar: undefined,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  'customer@agribot.com': {
    id: '2',
    name: 'Demo Customer',
    email: 'customer@agribot.com',
    role: 'customer',
    phone: '+233 24 987 6543',
    location: 'Accra, Greater Accra Region',
    avatar: undefined,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  'expert@agribot.com': {
    id: '3',
    name: 'Demo Expert',
    email: 'expert@agribot.com',
    role: 'expert',
    phone: '+233 26 555 1234',
    location: 'Ho, Volta Region',
    avatar: undefined,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
};

// Demo authentication function
const authenticateDemoUser = (email: string, password: string): User | null => {
  console.log('🔍 Checking demo user:', email, 'Password match:', password === 'demo123');
  console.log('📋 Available demo users:', Object.keys(DEMO_USERS));
  
  if (password === 'demo123' && DEMO_USERS[email]) {
    console.log('✅ Demo user authenticated:', email);
    return DEMO_USERS[email];
  }
  console.log('❌ Demo user not found or invalid password');
  return null;
};

// Token management
const getAuthToken = (): string | null => {
  return localStorage.getItem('agribot_token');
};

const setAuthToken = (token: string): void => {
  localStorage.setItem('agribot_token', token);
};

const removeAuthToken = (): void => {
  localStorage.removeItem('agribot_token');
};

// Generate demo token
const generateDemoToken = (user: User): string => {
  return `demo_token_${user.id}_${Date.now()}`;
};

// API request helper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication service
export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    console.log('🔐 Login attempt:', credentials.email);
    try {
      // Check for demo users first
      const demoUser = authenticateDemoUser(credentials.email, credentials.password);
      console.log('🔍 Demo user check result:', demoUser ? 'Found' : 'Not found');
      
      if (demoUser) {
        const token = generateDemoToken(demoUser);
        setAuthToken(token);
        console.log('✅ Demo login successful:', demoUser.name);
        return { user: demoUser, token };
      }

      console.log('❌ Demo login failed, trying API...');
      // If not a demo user, try API call (for future backend integration)
      const response = await apiRequest(AUTH_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      const { user, token } = response;
      setAuthToken(token);
      
      return { user, token };
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Invalid email or password');
    }
  },

  // Register new user
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      // For demo purposes, create a new demo user
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone || '',
        location: data.location || '',
        avatar: undefined,
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      const token = generateDemoToken(newUser);
      setAuthToken(token);
      
      return { user: newUser, token };
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      // For demo tokens, extract user info
      if (token.startsWith('demo_token_')) {
        const userId = token.split('_')[2];
        // Find user by ID in demo users
        const user = Object.values(DEMO_USERS).find(u => u.id === userId);
        if (user) {
          return user;
        }
      }

      // Try API call for real tokens
      const response = await apiRequest(AUTH_ENDPOINTS.profile);
      return response.user;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to get profile');
    }
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      // For demo tokens, update local user data
      if (token.startsWith('demo_token_')) {
        const userId = token.split('_')[2];
        const user = Object.values(DEMO_USERS).find(u => u.id === userId);
        if (user) {
          const updatedUser = { ...user, ...data, lastLogin: new Date() };
          // Update the demo user data
          DEMO_USERS[user.email] = updatedUser;
          return updatedUser;
        }
      }

      // Try API call for real tokens
      const response = await apiRequest(AUTH_ENDPOINTS.profile, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response.user;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  },

  // Refresh authentication token
  async refreshToken(): Promise<{ token: string }> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      // For demo tokens, generate a new one
      if (token.startsWith('demo_token_')) {
        const userId = token.split('_')[2];
        const user = Object.values(DEMO_USERS).find(u => u.id === userId);
        if (user) {
          const newToken = generateDemoToken(user);
          setAuthToken(newToken);
          return { token: newToken };
        }
      }

      // Try API call for real tokens
      const response = await apiRequest(AUTH_ENDPOINTS.refresh, {
        method: 'POST',
      });
      
      const { token: newToken } = response;
      setAuthToken(newToken);
      
      return { token: newToken };
    } catch (error) {
      console.error('Token refresh failed:', error);
      removeAuthToken();
      throw new Error(error instanceof Error ? error.message : 'Token refresh failed');
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      const token = getAuthToken();
      if (token && !token.startsWith('demo_token_')) {
        // Only call API for real tokens
        await apiRequest(AUTH_ENDPOINTS.logout, {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      removeAuthToken();
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  // Get stored token
  getToken(): string | null {
    return getAuthToken();
  },
};

// Alternative: Firebase Authentication
export const firebaseAuth = {
  // Initialize Firebase (you'll need to add Firebase SDK)
  async initialize() {
    // Firebase initialization code would go here
    // This is a placeholder for Firebase integration
  },

  // Login with email/password
  async loginWithEmail(credentials: LoginCredentials) {
    // Firebase email/password authentication
    // This is a placeholder for Firebase integration
  },

  // Register with email/password
  async registerWithEmail(data: RegisterData) {
    // Firebase email/password registration
    // This is a placeholder for Firebase integration
  },

  // Login with Google
  async loginWithGoogle() {
    // Firebase Google authentication
    // This is a placeholder for Firebase integration
  },

  // Login with phone number
  async loginWithPhone(phoneNumber: string) {
    // Firebase phone authentication
    // This is a placeholder for Firebase integration
  },
};

// Supabase Authentication
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const supabaseAuth = {
  // Initialize Supabase
  async initialize() {
    // Set up auth state listener
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Supabase auth state changed:', event, session?.user?.email);
    });
  },

  // Login with email/password
  async loginWithEmail(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('No user data returned');
      }

      // Convert Supabase user to our User type
      const user: User = {
        id: data.user.id,
        name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
        email: data.user.email!,
        role: data.user.user_metadata?.role || 'farmer',
        phone: data.user.phone || '',
        location: data.user.user_metadata?.location || '',
        avatar: data.user.user_metadata?.avatar_url,
        createdAt: new Date(data.user.created_at),
        lastLogin: new Date(),
      };

      return { user, token: data.session.access_token };
    } catch (error) {
      console.error('Supabase login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  },

  // Register with email/password
  async registerWithEmail(data: RegisterData): Promise<{ user: User; token: string }> {
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
          },
        },
      });

      if (error) throw error;

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // Convert Supabase user to our User type
      const user: User = {
        id: authData.user.id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone || '',
        location: data.location || '',
        avatar: undefined,
        createdAt: new Date(authData.user.created_at),
        lastLogin: new Date(),
      };

      return { user, token: authData.session?.access_token || '' };
    } catch (error) {
      console.error('Supabase registration failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  },

  // Login with OAuth (Google, GitHub, etc.)
  async loginWithOAuth(provider: 'google' | 'github' | 'facebook') {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Supabase OAuth login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'OAuth login failed');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (!user) return null;

      return {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email!,
        role: user.user_metadata?.role || 'farmer',
        phone: user.phone || '',
        location: user.user_metadata?.location || '',
        avatar: user.user_metadata?.avatar_url,
        createdAt: new Date(user.created_at),
        lastLogin: new Date(),
      };
    } catch (error) {
      console.error('Get current user failed:', error);
      return null;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Supabase logout failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Logout failed');
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Password reset failed');
    }
  },

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const { data: { user }, error } = await supabase.auth.updateUser({
        data: {
          full_name: updates.name,
          role: updates.role,
          phone: updates.phone,
          location: updates.location,
        },
      });

      if (error) throw error;
      if (!user) throw new Error('No user data returned');

      return {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email!,
        role: user.user_metadata?.role || 'farmer',
        phone: user.phone || '',
        location: user.user_metadata?.location || '',
        avatar: user.user_metadata?.avatar_url,
        createdAt: new Date(user.created_at),
        lastLogin: new Date(),
      };
    } catch (error) {
      console.error('Update profile failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Update profile failed');
    }
  },
};

// Alternative: Auth0 Authentication
export const auth0Auth = {
  // Initialize Auth0 (you'll need to add Auth0 SDK)
  async initialize() {
    // Auth0 initialization code would go here
    // This is a placeholder for Auth0 integration
  },

  // Login with redirect
  async login() {
    // Auth0 login with redirect
    // This is a placeholder for Auth0 integration
  },

  // Handle authentication callback
  async handleCallback() {
    // Auth0 callback handling
    // This is a placeholder for Auth0 integration
  },

  // Logout
  async logout() {
    // Auth0 logout
    // This is a placeholder for Auth0 integration
  },
}; 