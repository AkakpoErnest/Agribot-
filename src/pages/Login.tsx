import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, Globe, Mic, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-earth flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary p-8 text-primary-foreground">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Agribot</h1>
            <p className="text-lg text-primary-foreground/90">
              Your AI-powered agricultural assistant for Ghana
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Agricultural Assistant</h3>
                <p className="text-sm text-primary-foreground/80">
                  Get instant answers about crops, pests, and farming techniques
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-lg">
                <Mic className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Voice Communication</h3>
                <p className="text-sm text-primary-foreground/80">
                  Speak in your local language and get responses
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Multi-language Support</h3>
                <p className="text-sm text-primary-foreground/80">
                  Available in Twi, Ewe, Ga, and English
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-primary-foreground/80">
                  Your data is protected with industry-standard security
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Join Our Community</h4>
              <p className="text-sm text-primary-foreground/80">
                Connect with farmers, customers, and agricultural experts across Ghana
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back to Home */}
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Login Form */}
          <LoginForm onSwitchToRegister={() => {}} />

          {/* Footer */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>🌾 Made for Ghana</span>
              <span>•</span>
              <span>🇬🇭 Local Support</span>
              <span>•</span>
              <span>🤖 AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 