import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { ChatInterface } from "@/components/ChatInterface";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { Bot, Zap, Languages } from 'lucide-react';
import heroImage from "@/assets/agribot-hero.jpg";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-earth">
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
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
              Agribot
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Bridging Communication in Ghana's Agriculture
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              Connect farmers, extension officers, and customers through multilingual voice communication in Twi, Ewe, Ga, and English
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Button 
                variant="harvest" 
                size="lg"
                onClick={() => setShowChat(true)}
                className="gap-2"
              >
                <Bot className="h-5 w-5" />
                {selectedLanguage === 'en' ? 'Start AI Chat' :
                 selectedLanguage === 'tw' ? 'Fi AI Nkɔmmɔ Ase' :
                 selectedLanguage === 'ee' ? 'Dze AI Nubiabia Gɔme' :
                 selectedLanguage === 'ga' ? 'Fi AI Nkɔmmɔ Ase' : 'Start AI Chat'}
              </Button>
              <Button variant="earth" size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                {selectedLanguage === 'en' ? 'View Features' :
                 selectedLanguage === 'tw' ? 'Hwɛ Nneɛma' :
                 selectedLanguage === 'ee' ? 'Kpɔ Nɔɔ̃wo' :
                 selectedLanguage === 'ga' ? 'Hwɛ Nneɛma' : 'View Features'}
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
              {selectedLanguage === 'en' ? 'Select your preferred language to get started with Agribot' :
               selectedLanguage === 'tw' ? 'Paw wo kasa a wo pɛ na fi Agribot ase' :
               selectedLanguage === 'ee' ? 'Tia wò gbe si wòlɔ̃ eye nàdze Agribot gɔme' :
               selectedLanguage === 'ga' ? 'Paw wo kasa a wo pɛ na fi Agribot ase' : 'Select your preferred language to get started with Agribot'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="max-w-2xl mx-auto mb-8">
            <LanguageSelector 
              onLanguageSelect={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
          </div>

          {/* Quick Start Button */}
          <div className="text-center">
            <Button 
              variant="ghana" 
              size="lg"
              onClick={() => setShowChat(true)}
              className="gap-2"
            >
              <Bot className="h-5 w-5" />
              {selectedLanguage === 'en' ? 'Start AI Conversation' :
               selectedLanguage === 'tw' ? 'Fi AI Nkɔmmɔ Ase' :
               selectedLanguage === 'ee' ? 'Dze AI Nubiabia Gɔme' :
               selectedLanguage === 'ga' ? 'Fi AI Nkɔmmɔ Ase' : 'Start AI Conversation'}
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Showcase - Now comes after language selection */}
      <FeatureShowcase language={selectedLanguage} />

      {/* Interactive Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {selectedLanguage === 'en' ? 'Experience Agribot' :
             selectedLanguage === 'tw' ? 'Sɔ Agribot Hwɛ' :
             selectedLanguage === 'ee' ? 'Te Agribot Kpɔ' :
             selectedLanguage === 'ga' ? 'Sɔ Agribot Hwɛ' : 'Experience Agribot'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectedLanguage === 'en' ? 'Start communicating with our AI assistant' :
             selectedLanguage === 'tw' ? 'Fi nkitaho ase yɛ wo AI boafoɔ' :
             selectedLanguage === 'ee' ? 'Dze nubiabia gɔme yɛ mía AI kpeɖeŋutɔ' :
             selectedLanguage === 'ga' ? 'Fi nkitaho ase yɛ wo AI boafoɔ' : 'Start communicating with our AI assistant'}
          </p>
        </div>

        {/* Chat Interface */}
        {showChat ? (
          <div className="max-w-4xl mx-auto">
            <ChatInterface language={selectedLanguage} />
          </div>
        ) : (
          <div className="text-center">
            <Button 
              variant="ghana" 
              size="lg"
              onClick={() => setShowChat(true)}
              className="gap-2"
            >
              <Bot className="h-5 w-5" />
              {selectedLanguage === 'en' ? 'Start AI Conversation' :
               selectedLanguage === 'tw' ? 'Fi AI Nkɔmmɔ Ase' :
               selectedLanguage === 'ee' ? 'Dze AI Nubiabia Gɔme' :
               selectedLanguage === 'ga' ? 'Fi AI Nkɔmmɔ Ase' : 'Start AI Conversation'}
            </Button>
          </div>
        )}
      </section>

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
