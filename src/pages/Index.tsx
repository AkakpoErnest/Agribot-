import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { ChatInterface } from "@/components/ChatInterface";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { TeamSection } from "@/components/TeamSection";
import { Bot, Zap, Languages, User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import heroImage from "@/assets/agribot-hero.jpg";
import agribotLogo from "/agribot-logo.png";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { user, isAuthenticated, logout } = useAuth();

  const getRoleInfo = (role: string) => {
    const roleInfo = {
      farmer: { icon: '🌾', title: 'Farmer', color: 'bg-green-100 text-green-800' },
      customer: { icon: '🛒', title: 'Customer', color: 'bg-blue-100 text-blue-800' },
      expert: { icon: '👨‍🌾', title: 'Expert', color: 'bg-purple-100 text-purple-800' }
    };
    return roleInfo[role as keyof typeof roleInfo] || roleInfo.farmer;
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Navigation Header */}
      <header className="bg-gradient-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
            <img src={agribotLogo} alt="Agribot Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-bold">Agribot</h1>
          </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Badge className={getRoleInfo(user?.role).color}>
                    {getRoleInfo(user?.role).icon} {getRoleInfo(user?.role).title}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 text-primary-foreground hover:bg-primary-foreground/20">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-xs">
                            {user?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline">{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="harvest" size="sm">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-center mb-6">
              <img src={agribotLogo} alt="Agribot Logo" className="h-24 w-auto drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
              Agribot
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Bridging Communication in Ghana's Agriculture
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              Connect farmers, extension officers, and customers through multilingual voice communication in Twi, Ewe, Ga, and English
            </p>
            
            {isAuthenticated && (
              <div className="bg-primary-foreground/10 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-primary-foreground/90">
                  Welcome back, {user?.name}! Ready to continue your agricultural journey?
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Button 
                variant="harvest" 
                size="lg"
                onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                <Bot className="h-5 w-5" />
                {selectedLanguage === 'en' ? 'Start AI Chat' :
                 selectedLanguage === 'tw' ? 'Fi AI Nkɔmmɔ Ase' :
                 selectedLanguage === 'ee' ? 'Dze AI Nubiabia Gɔme' :
                 selectedLanguage === 'ga' ? 'Fi AI Nkɔmmɔ Ase' : 'Start AI Chat'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Section - Now comes first */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Languages className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {selectedLanguage === 'en' ? 'Choose Your Language' :
                 selectedLanguage === 'tw' ? 'Paw Wo Kasa' :
                 selectedLanguage === 'ee' ? 'Tia Wò Gbe' :
                 selectedLanguage === 'ga' ? 'Paw Wo Kasa' : 'Choose Your Language'}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {selectedLanguage === 'en' ? 'Select your preferred language to enhance your experience' :
               selectedLanguage === 'tw' ? 'Paw wo kasa a wo pɛ na ma wo adwuma yɛ wo' :
               selectedLanguage === 'ee' ? 'Tia wò gbe si wòlɔ̃ eye nàwɔ wò dɔwɔwɔ' :
               selectedLanguage === 'ga' ? 'Paw wo kasa a wo pɛ na ma wo adwuma yɛ wo' : 'Select your preferred language to enhance your experience'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="max-w-2xl mx-auto mb-8">
            <LanguageSelector 
              onLanguageSelect={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
          </div>
        </div>
      </section>

      {/* AI Bot Interface - Now comes after language selection */}
      <section id="chat-section" className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Bot className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {selectedLanguage === 'en' ? 'Chat with Agribot' :
                 selectedLanguage === 'tw' ? 'Di Nkɔmmɔ Yɛ Agribot' :
                 selectedLanguage === 'ee' ? 'Dze Nubiabia Yɛ Agribot' :
                 selectedLanguage === 'ga' ? 'Di Nkɔmmɔ Yɛ Agribot' : 'Chat with Agribot'}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {selectedLanguage === 'en' ? 'Start chatting with our AI agricultural assistant' :
               selectedLanguage === 'tw' ? 'Fi nkɔmmɔ ase yɛ yɛn AI kuayɛ boafoɔ' :
               selectedLanguage === 'ee' ? 'Dze nubiabia gɔme yɛ mía AI agblẽnɔnɔ kpeɖeŋutɔ' :
               selectedLanguage === 'ga' ? 'Fi nkɔmmɔ ase yɛ yɛn AI kuayɛ boafoɔ' : 'Start chatting with our AI agricultural assistant'}
            </p>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <ChatInterface language={selectedLanguage} />
          </div>
        </div>
      </section>

      {/* AI Features Showcase - Now comes after language selection */}
      <FeatureShowcase language={selectedLanguage} />

      {/* Team Section */}
      <TeamSection language={selectedLanguage} />

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">4</h3>
              <p className="text-primary-foreground/80">
                {selectedLanguage === 'en' ? 'Languages Supported' :
                 selectedLanguage === 'tw' ? 'Kasa a Yɛde Di Dwuma' :
                 selectedLanguage === 'ee' ? 'Gbe Siwo Wòzãna' :
                 selectedLanguage === 'ga' ? 'Kasa a Yɛde Di Dwuma' : 'Languages Supported'}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-primary-foreground/80">
                {selectedLanguage === 'en' ? 'AI Assistant Available' :
                 selectedLanguage === 'tw' ? 'AI Boafoɔ Wɔ Hɔ' :
                 selectedLanguage === 'ee' ? 'AI Kpeɖeŋutɔ Li' :
                 selectedLanguage === 'ga' ? 'AI Boafoɔ Wɔ Hɔ' : 'AI Assistant Available'}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">∞</h3>
              <p className="text-primary-foreground/80">
                {selectedLanguage === 'en' ? 'Voice Messages' :
                 selectedLanguage === 'tw' ? 'Nne Nkra' :
                 selectedLanguage === 'ee' ? 'Gbeɖoɖo Nyawo' :
                 selectedLanguage === 'ga' ? 'Nne Nkra' : 'Voice Messages'}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">🇬🇭</h3>
              <p className="text-primary-foreground/80">
                {selectedLanguage === 'en' ? 'Made for Ghana' :
                 selectedLanguage === 'tw' ? 'Wɔayɛ ama Ghana' :
                 selectedLanguage === 'ee' ? 'Wowɔe na Ghana' :
                 selectedLanguage === 'ga' ? 'Wɔayɛ ama Ghana' : 'Made for Ghana'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img src={agribotLogo} alt="Agribot Logo" className="h-12 w-auto" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Agribot</h3>
          <p className="text-primary-foreground/80 mb-4">
            Transforming agricultural communication across Ghana
          </p>
          <p className="text-sm text-primary-foreground/60">
            Supporting farmers in Twi, Ewe, Ga, and English
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
