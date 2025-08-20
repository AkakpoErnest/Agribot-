import { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { languageDetector } from '@/services/languageDetection';

export const VoiceDemo = () => {
  const [messages, setMessages] = useState<Array<{
    text: string;
    language: string;
    timestamp: Date;
  }>>([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleMessageReceived = (message: string, detectedLanguage: string) => {
    const newMessage = {
      text: message,
      language: detectedLanguage,
      timestamp: new Date()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const supportedLanguages = languageDetector.getSupportedLanguages();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <h2 className="text-2xl font-bold text-center mb-4">
          🎤 Multilingual Voice Recognition Demo
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Speak in any of these Ghanaian languages and watch the bot detect and respond!
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {supportedLanguages.map(lang => (
            <Badge
              key={lang.code}
              variant={currentLanguage === lang.code ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => setCurrentLanguage(lang.code)}
            >
              {lang.nativeName} ({lang.name})
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'en' ? 'Voice Input' :
               currentLanguage === 'tw' ? 'Nne Input' :
               currentLanguage === 'ee' ? 'Gbe Input' :
               currentLanguage === 'ga' ? 'Nne Input' :
               currentLanguage === 'da' ? 'Nne Input' :
               currentLanguage === 'fa' ? 'Nne Input' : 'Voice Input'}
            </h3>
            <VoiceRecorder
              language={currentLanguage}
              onMessageReceived={handleMessageReceived}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'en' ? 'Detected Messages' :
               currentLanguage === 'tw' ? 'Nkra a Wɔahwɛ' :
               currentLanguage === 'ee' ? 'Nyawo siwo Wɔahwɛ' :
               currentLanguage === 'ga' ? 'Nkra a Wɔahwɛ' :
               currentLanguage === 'da' ? 'Nkra a Wɔahwɛ' :
               currentLanguage === 'fa' ? 'Nkra a Wɔahwɛ' : 'Detected Messages'}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {currentLanguage === 'en' ? 'No messages yet. Try speaking into the microphone!' :
                   currentLanguage === 'tw' ? 'Nkra nni hɔ bio. Sɔ wo nne wɔ microphone mu!' :
                   currentLanguage === 'ee' ? 'Nyawo meli o hã. Sɔ wo gbe wɔ microphone me!' :
                   currentLanguage === 'ga' ? 'Nkra nni hɔ bio. Sɔ wo nne wɔ microphone mu!' :
                   currentLanguage === 'da' ? 'Nkra nni hɔ bio. Sɔ wo nne wɔ microphone mu!' :
                   currentLanguage === 'fa' ? 'Nkra nni hɔ bio. Sɔ wo nne wɔ microphone mu!' : 'No messages yet. Try speaking into the microphone!'}
                </p>
              ) : (
                messages.map((msg, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{msg.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {supportedLanguages.find(l => l.code === msg.language)?.nativeName || msg.language}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
        <h3 className="text-lg font-semibold mb-4">
          🌍 {currentLanguage === 'en' ? 'Language Support' :
              currentLanguage === 'tw' ? 'Kasa Boafo' :
              currentLanguage === 'ee' ? 'Gbe Kpeɖeŋu' :
              currentLanguage === 'ga' ? 'Kasa Boafo' :
              currentLanguage === 'da' ? 'Kasa Boafo' :
              currentLanguage === 'fa' ? 'Kasa Boafo' : 'Language Support'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportedLanguages.map(lang => (
            <div key={lang.code} className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2">
                {lang.code === 'tw' ? '🇬🇭' : 
                 lang.code === 'ee' ? '🇬🇭' : 
                 lang.code === 'ga' ? '🇬🇭' :
                 lang.code === 'da' ? '🇬🇭' :
                 lang.code === 'fa' ? '🇬🇭' : '🇬🇧'}
              </div>
              <h4 className="font-semibold">{lang.nativeName}</h4>
              <p className="text-sm text-muted-foreground">{lang.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{lang.region}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-lg font-semibold mb-4">
          💡 {currentLanguage === 'en' ? 'How It Works' :
              currentLanguage === 'tw' ? 'Sɛ Ɛyɛ Adwuma' :
              currentLanguage === 'ee' ? 'Aleke Ɛyɛ Dɔwɔwɔ' :
              currentLanguage === 'ga' ? 'Sɛ Ɛyɛ Adwuma' :
              currentLanguage === 'da' ? 'Sɛ Ɛyɛ Adwuma' :
              currentLanguage === 'fa' ? 'Sɛ Ɛyɛ Adwuma' : 'How It Works'}
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p><strong>{currentLanguage === 'en' ? 'Speak:' : 
                         currentLanguage === 'tw' ? 'Kasa:' :
                         currentLanguage === 'ee' ? 'Ƒo nu:' :
                         currentLanguage === 'ga' ? 'Kasa:' :
                         currentLanguage === 'da' ? 'Kasa:' :
                         currentLanguage === 'fa' ? 'Kasa:' : 'Speak:'}</strong> {currentLanguage === 'en' ? 'Click the microphone and speak in any supported language' : 
                                                                                    currentLanguage === 'tw' ? 'Tow microphone na kasa wɔ kasa biara a ɛwɔ hɔ' :
                                                                                    currentLanguage === 'ee' ? 'Tow microphone eye ɖo nu le gbe biara si le dɔwɔwɔ me' :
                                                                                    currentLanguage === 'ga' ? 'Tow microphone na kasa wɔ kasa biara a ɛwɔ hɔ' :
                                                                                    currentLanguage === 'da' ? 'Tow microphone na kasa wɔ kasa biara a ɛwɔ hɔ' :
                                                                                    currentLanguage === 'fa' ? 'Tow microphone na kasa wɔ kasa biara a ɛwɔ hɔ' : 'Click the microphone and speak in any supported language'}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p><strong>{currentLanguage === 'en' ? 'Detect:' : 
                         currentLanguage === 'tw' ? 'Hwɛ:' :
                         currentLanguage === 'ee' ? 'Hwɛ:' :
                         currentLanguage === 'ga' ? 'Hwɛ:' :
                         currentLanguage === 'da' ? 'Hwɛ:' :
                         currentLanguage === 'fa' ? 'Hwɛ:' : 'Detect:'}</strong> {currentLanguage === 'en' ? 'Our AI analyzes speech patterns to identify the language' : 
                                                                                    currentLanguage === 'tw' ? 'Yɛn AI hwɛ nne pattern ma ɛhwɛ kasa' :
                                                                                    currentLanguage === 'ee' ? 'Mía AI hwɛ gbe pattern ma míeɖe gbe' :
                                                                                    currentLanguage === 'ga' ? 'Yɛn AI hwɛ nne pattern ma ɛhwɛ kasa' :
                                                                                    currentLanguage === 'da' ? 'Yɛn AI hwɛ nne pattern ma ɛhwɛ kasa' :
                                                                                    currentLanguage === 'fa' ? 'Yɛn AI hwɛ nne pattern ma ɛhwɛ kasa' : 'Our AI analyzes speech patterns to identify the language'}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p><strong>{currentLanguage === 'en' ? 'Transcribe:' : 
                         currentLanguage === 'tw' ? 'Kyerɛw:' :
                         currentLanguage === 'ee' ? 'Ŋlɔ:' :
                         currentLanguage === 'ga' ? 'Kyerɛw:' :
                         currentLanguage === 'da' ? 'Kyerɛw:' :
                         currentLanguage === 'fa' ? 'Kyerɛw:' : 'Transcribe:'}</strong> {currentLanguage === 'en' ? 'Speech is converted to text in the detected language' : 
                                                                                    currentLanguage === 'tw' ? 'Nne yɛ text wɔ kasa a ɛhwɛ' :
                                                                                    currentLanguage === 'ee' ? 'Gbe yɛ text le gbe si míeɖe' :
                                                                                    currentLanguage === 'ga' ? 'Nne yɛ text wɔ kasa a ɛhwɛ' :
                                                                                    currentLanguage === 'da' ? 'Nne yɛ text wɔ kasa a ɛhwɛ' :
                                                                                    currentLanguage === 'fa' ? 'Nne yɛ text wɔ kasa a ɛhwɛ' : 'Speech is converted to text in the detected language'}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <p><strong>{currentLanguage === 'en' ? 'Respond:' : 
                         currentLanguage === 'tw' ? 'Gyae mmuae:' :
                         currentLanguage === 'ee' ? 'Gyae ŋuɖoɖo:' :
                         currentLanguage === 'ga' ? 'Gyae mmuae:' :
                         currentLanguage === 'da' ? 'Gyae mmuae:' :
                         currentLanguage === 'fa' ? 'Gyae mmuae:' : 'Respond:'}</strong> {currentLanguage === 'en' ? 'The bot can now understand and respond appropriately' : 
                                                                                    currentLanguage === 'tw' ? 'Bot no tumi ase na ɛgyae mmuae' :
                                                                                    currentLanguage === 'ee' ? 'Bot no tumi ase eye ɛgyae ŋuɖoɖo' :
                                                                                    currentLanguage === 'ga' ? 'Bot no tumi ase na ɛgyae mmuae' :
                                                                                    currentLanguage === 'da' ? 'Bot no tumi ase na ɛgyae mmuae' :
                                                                                    currentLanguage === 'fa' ? 'Bot no tumi ase na ɛgyae mmuae' : 'The bot can now understand and respond appropriately'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
