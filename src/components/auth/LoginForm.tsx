import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, User, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  language?: string;
}

export const LoginForm = ({ onSwitchToRegister, language = 'en' }: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer' as UserRole,
    phone: '',
    location: '',
  });

  const { login, register, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted:', { isLogin, formData });
    clearError?.();

    if (isLogin) {
      console.log('🔐 Attempting login with:', { email: formData.email, password: formData.password });
      try {
        await login({
          email: formData.email,
          password: formData.password,
        });
        console.log('✅ Login successful');
      } catch (error) {
        console.error('❌ Login error in form:', error);
      }
    } else {
      console.log('📝 Attempting registration with:', formData);
      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          location: formData.location,
        });
        console.log('✅ Registration successful');
      } catch (error) {
        console.error('❌ Registration error in form:', error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRoleDescription = (role: UserRole) => {
    const descriptions = {
      farmer: 'Access farming advice, crop management, and market information',
      customer: 'Browse agricultural products and connect with farmers',
      expert: 'Provide expert advice and manage agricultural services',
    };
    return descriptions[role];
  };

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      farmer: '🌾',
      customer: '🛒',
      expert: '👨‍🌾',
    };
    return icons[role];
  };

  // Multilingual text content
  const getText = (key: string) => {
    const texts = {
      welcomeBack: {
        en: 'Welcome Back',
        tw: 'Akwaaba Bio',
        ee: 'Woezɔ Bio',
        ga: 'Akwaaba Bio'
      },
      joinAgribot: {
        en: 'Join Agribot',
        tw: 'Ka Agribot Ho',
        ee: 'Ka Agribot Gbɔ',
        ga: 'Ka Agribot Ho'
      },
      signInToAccount: {
        en: 'Sign in to your account',
        tw: 'Sign in wo account mu',
        ee: 'Sign in wò account me',
        ga: 'Sign in wo account mu'
      },
      createAccount: {
        en: 'Create your account',
        tw: 'Yɛ wo account',
        ee: 'Wɔ wò account',
        ga: 'Yɛ wo account'
      },
      fullName: {
        en: 'Full Name',
        tw: 'Din Nyinaa',
        ee: 'Ŋkɔ Katã',
        ga: 'Din Nyinaa'
      },
      enterFullName: {
        en: 'Enter your full name',
        tw: 'Kyerɛw wo din nyinaa',
        ee: 'Ŋlɔ wò ŋkɔ katã',
        ga: 'Ŋmɛ wo din nyinaa'
      },
      iAmA: {
        en: 'I am a...',
        tw: 'Meyɛ...',
        ee: 'Nye...',
        ga: 'Miyɛ...'
      },
      selectRole: {
        en: 'Select your role',
        tw: 'Paw wo role',
        ee: 'Tia wò role',
        ga: 'Paw wo role'
      },
      phoneNumber: {
        en: 'Phone Number',
        tw: 'Phone Number',
        ee: 'Phone Number',
        ga: 'Phone Number'
      },
      enterPhone: {
        en: '+233 XX XXX XXXX',
        tw: '+233 XX XXX XXXX',
        ee: '+233 XX XXX XXXX',
        ga: '+233 XX XXX XXXX'
      },
      location: {
        en: 'Location',
        tw: 'Mmeae',
        ee: 'Teƒe',
        ga: 'Mmeae'
      },
      enterLocation: {
        en: 'City, Region',
        tw: 'Kurow, Mpɔtam',
        ee: 'Kuƒo, Nutɔ',
        ga: 'Kurow, Mpɔtam'
      },
      emailAddress: {
        en: 'Email Address',
        tw: 'Email Address',
        ee: 'Email Address',
        ga: 'Email Address'
      },
      enterEmail: {
        en: 'Enter your email',
        tw: 'Kyerɛw wo email',
        ee: 'Ŋlɔ wò email',
        ga: 'Ŋmɛ wo email'
      },
      password: {
        en: 'Password',
        tw: 'Password',
        ee: 'Password',
        ga: 'Password'
      },
      enterPassword: {
        en: 'Enter your password',
        tw: 'Kyerɛw wo password',
        ee: 'Ŋlɔ wò password',
        ga: 'Ŋmɛ wo password'
      },
      signIn: {
        en: 'Sign In',
        tw: 'Sign In',
        ee: 'Sign In',
        ga: 'Sign In'
      },
      signingIn: {
        en: 'Signing In...',
        tw: 'Signing In...',
        ee: 'Signing In...',
        ga: 'Signing In...'
      },
      createAccountButton: {
        en: 'Create Account',
        tw: 'Yɛ Account',
        ee: 'Wɔ Account',
        ga: 'Yɛ Account'
      },
      creatingAccount: {
        en: 'Creating Account...',
        tw: 'Yɛ Account...',
        ee: 'Wɔ Account...',
        ga: 'Yɛ Account...'
      },
      dontHaveAccount: {
        en: "Don't have an account? Sign up",
        tw: 'Wo nni account? Sign up',
        ee: 'Wò mele account? Sign up',
        ga: 'Wo nni account? Sign up'
      },
      haveAccount: {
        en: 'Already have an account? Sign in',
        tw: 'Wo wɔ account? Sign in',
        ee: 'Wò le account? Sign in',
        ga: 'Wo wɔ account? Sign in'
      },
      demoAccounts: {
        en: 'Demo Accounts:',
        tw: 'Demo Account:',
        ee: 'Demo Account:',
        ga: 'Demo Account:'
      },
      anyPassword: {
        en: 'Password: any password',
        tw: 'Password: password biara',
        ee: 'Password: password bubu',
        ga: 'Password: password biara'
      }
    };
    
    const textGroup = texts[key as keyof typeof texts];
    return textGroup?.[language as keyof typeof textGroup] || textGroup?.en || key;
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 bg-gradient-earth border-2">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {isLogin ? getText('welcomeBack') : getText('joinAgribot')}
        </h2>
        <p className="text-muted-foreground">
          {isLogin ? getText('signInToAccount') : getText('createAccount')}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">{getText('fullName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder={getText('enterFullName')}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  required={!isLogin}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{getText('iAmA')}</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => handleInputChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={getText('selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">
                    <div className="flex items-center gap-2">
                      <span>🌾</span>
                      <span>Farmer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="customer">
                    <div className="flex items-center gap-2">
                      <span>🛒</span>
                      <span>Customer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="expert">
                    <div className="flex items-center gap-2">
                      <span>👨‍🌾</span>
                      <span>Service Expert</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getRoleDescription(formData.role)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{getText('phoneNumber')}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={getText('enterPhone')}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{getText('location')}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder={getText('enterLocation')}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">{getText('emailAddress')}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder={getText('enterEmail')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{getText('password')}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={getText('enterPassword')}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isLogin ? getText('signingIn') : getText('creatingAccount')}
            </>
          ) : (
            isLogin ? getText('signIn') : getText('createAccountButton')
          )}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm"
        >
          {isLogin ? getText('dontHaveAccount') : getText('haveAccount')}
        </Button>
      </div>

      {isLogin && (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{getText('demoAccounts')}</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  email: 'farmer@agribot.com',
                  password: 'demo123'
                }));
              }}
              className="w-full text-xs"
            >
              🌾 Farmer: farmer@agribot.com / demo123
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  email: 'customer@agribot.com',
                  password: 'demo123'
                }));
              }}
              className="w-full text-xs"
            >
              🛒 Customer: customer@agribot.com / demo123
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  email: 'expert@agribot.com',
                  password: 'demo123'
                }));
              }}
              className="w-full text-xs"
            >
              👨‍🌾 Expert: expert@agribot.com / demo123
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}; 