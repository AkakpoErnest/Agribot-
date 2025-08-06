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
  if (password === 'demo123' && DEMO_USERS[email]) {
    return DEMO_USERS[email];
  }
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
    try {
      // Check for demo users first
      const demoUser = authenticateDemoUser(credentials.email, credentials.password);
      if (demoUser) {
        const token = generateDemoToken(demoUser);
        setAuthToken(token);
        return { user: demoUser, token };
      }

      // If not a demo user, try API call (for future backend integration)
      const response = await apiRequest(AUTH_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      const { user, token } = response;
      setAuthToken(token);
      
      return { user, token };
    } catch (error) {
      console.error('Login failed:', error);
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

// Alternative: Supabase Authentication
export const supabaseAuth = {
  // Initialize Supabase (you'll need to add Supabase SDK)
  async initialize() {
    // Supabase initialization code would go here
    // This is a placeholder for Supabase integration
  },

  // Login with email/password
  async loginWithEmail(credentials: LoginCredentials) {
    // Supabase email/password authentication
    // This is a placeholder for Supabase integration
  },

  // Register with email/password
  async registerWithEmail(data: RegisterData) {
    // Supabase email/password registration
    // This is a placeholder for Supabase integration
  },

  // Login with OAuth (Google, GitHub, etc.)
  async loginWithOAuth(provider: 'google' | 'github' | 'facebook') {
    // Supabase OAuth authentication
    // This is a placeholder for Supabase integration
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