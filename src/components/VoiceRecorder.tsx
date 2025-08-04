import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send } from 'lucide-react';

interface VoiceRecorderProps {
  language: string;
}

export const VoiceRecorder = ({ language }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
    }
  };

  const sendMessage = () => {
    // Placeholder for sending voice message
    setHasRecording(false);
  };

  return (
    <Card className="p-6 bg-gradient-earth border-2">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Record Your Message' : 
           language === 'tw' ? 'Kyerɛw wo nkra' :
           language === 'ee' ? 'Ŋlɔ wò nya' :
           language === 'ga' ? 'Ŋmɛ wo nyɛ' : 'Record Your Message'}
        </h3>
        
        <div className="flex flex-col items-center gap-4">
          <Button
            variant={isRecording ? "destructive" : "harvest"}
            size="lg"
            className={`h-20 w-20 rounded-full transition-all duration-300 ${
              isRecording ? 'animate-pulse' : ''
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground max-w-xs">
            {isRecording 
              ? (language === 'en' ? 'Recording... Tap to stop' :
                 language === 'tw' ? 'Rekyɛw... Tow na egyae' :
                 language === 'ee' ? 'Dzi... Tɔ be nàtso' :
                 language === 'ga' ? 'Gbalẽi... Tɔ nà bɔ' : 'Recording... Tap to stop')
              : (language === 'en' ? 'Tap to start recording your voice message' :
                 language === 'tw' ? 'Tow na fi ase kyerɛw wo nne nkra' :
                 language === 'ee' ? 'Tɔ nàdze gɔmedzedze' :
                 language === 'ga' ? 'Tɔ nà bɔ gɔme' : 'Tap to start recording your voice message')
            }
          </p>
          
          {hasRecording && (
            <Button variant="ghana" onClick={sendMessage} className="gap-2">
              <Send className="h-4 w-4" />
              {language === 'en' ? 'Send Message' :
               language === 'tw' ? 'Soma nkra' :
               language === 'ee' ? 'Dɔ nya' :
               language === 'ga' ? 'Soma' : 'Send Message'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};