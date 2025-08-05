import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { ChatInterface } from "@/components/ChatInterface";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { TeamSection } from "@/components/TeamSection";
import { NewsUpdates } from "@/components/NewsUpdates";
import { Bot, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
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
                onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                <Bot className="h-5 w-5" />
                {selectedLanguage === 'en' ? 'Start AI Chat' :
                 selectedLanguage === 'tw' ? 'Fi AI Nkɔmmɔ Ase' :
                 selectedLanguage === 'ee' ? 'Dze AI Nubiabia Gɔme' :
                 selectedLanguage === 'ga' ? 'Fi AI Nkɔmmɔ Ase' : 'Start AI Chat'}
              </Button>
              <Link to="/features">
                <Button variant="earth" size="lg" className="gap-2">
                  <Zap className="h-5 w-5" />
                  {selectedLanguage === 'en' ? 'View Features' :
                   selectedLanguage === 'tw' ? 'Hwɛ Nneɛma' :
                   selectedLanguage === 'ee' ? 'Kpɔ Nɔɔ̃wo' :
                   selectedLanguage === 'ga' ? 'Hwɛ Nneɛma' : 'View Features'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Section - Now comes first */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
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

      {/* News & Updates Section */}
      <NewsUpdates language={selectedLanguage} />

      {/* Weather and Market Prices Widgets - Temporarily commented out */}
      {/* <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {selectedLanguage === 'en' ? 'Live Agricultural Data' :
               selectedLanguage === 'tw' ? 'Kuayɛ Nsɛm a Ɛrekɔ So' :
               language === 'ee' ? 'Agblẽnɔnɔ Nyawo Siwo Le Dɔwɔm' :
               language === 'ga' ? 'Kuayɛ Nsɛm a Ɛrekɔ So' : 'Live Agricultural Data'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {selectedLanguage === 'en' ? 'Get real-time weather and market information for informed farming decisions' :
               selectedLanguage === 'tw' ? 'Nya ewiem ne gua nsɛm a ɛrekɔ so ma kuayɛ nsɛm pa' :
               selectedLanguage === 'ee' ? 'Xɔ yame kple asi nyawo siwo le dɔwɔm na agblẽnɔnɔ ɖoɖo' :
               selectedLanguage === 'ga' ? 'Nya ewiem ne gua nsɛm a ɛrekɔ so ma kuayɛ nsɛm pa' : 'Get real-time weather and market information'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WeatherWidget language={selectedLanguage} location={selectedLocation} />
            <MarketPricesWidget language={selectedLanguage} location={selectedLocation} />
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <TeamSection language={selectedLanguage} />

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
