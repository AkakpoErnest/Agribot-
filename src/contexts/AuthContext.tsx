import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterData, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('agribot_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('agribot_user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUsers: Record<string, User> = {
        'farmer@agribot.com': {
          id: '1',
          email: 'farmer@agribot.com',
          name: 'Kwame Asante',
          role: 'farmer',
          phone: '+233 24 123 4567',
          location: 'Kumasi, Ashanti Region',
          avatar: '/avatars/farmer.jpg',
          createdAt: new Date('2024-01-01'),
          lastLogin: new Date(),
        },
        'customer@agribot.com': {
          id: '2',
          email: 'customer@agribot.com',
          name: 'Ama Osei',
          role: 'customer',
          phone: '+233 20 987 6543',
          location: 'Accra, Greater Accra',
          avatar: '/avatars/customer.jpg',
          createdAt: new Date('2024-01-15'),
          lastLogin: new Date(),
        },
        'expert@agribot.com': {
          id: '3',
          email: 'expert@agribot.com',
          name: 'Dr. Kofi Mensah',
          role: 'expert',
          phone: '+233 26 555 1234',
          location: 'Tamale, Northern Region',
          avatar: '/avatars/expert.jpg',
          createdAt: new Date('2024-01-10'),
          lastLogin: new Date(),
        },
      };

      const user = mockUsers[credentials.email];
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Save to localStorage
      localStorage.setItem('agribot_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role,
        phone: data.phone,
        location: data.location,
        avatar: `/avatars/${data.role}.jpg`,
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      localStorage.setItem('agribot_user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : 'Registration failed' });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('agribot_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (state.user) {
      const updatedUser = { ...state.user, ...data };
      localStorage.setItem('agribot_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 