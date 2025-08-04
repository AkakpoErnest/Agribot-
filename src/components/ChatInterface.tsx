import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Send, Bot, User, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

interface ChatInterfaceProps {
  language: string;
}

export const ChatInterface = ({ language }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    // @ts-ignore - Browser speech recognition API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getLanguageCode(language);
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not process your voice. Please try again.",
          variant: "destructive",
        });
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language, toast]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getLanguageCode = (lang: string) => {
    const codes = {
      'en': 'en-US',
      'tw': 'ak-GH', // Twi fallback to English
      'ee': 'ee-GH', // Ewe fallback to English  
      'ga': 'ga-GH', // Ga fallback to English
    };
    return codes[lang as keyof typeof codes] || 'en-US';
  };

  const getGreeting = () => {
    const greetings = {
      'en': 'Hello! I\'m your agricultural assistant. How can I help you today?',
      'tw': 'Akwaaba! Meyɛ wo kuayɛ boafoɔ. Ɛdeɛn na metumi aboa wo nnɛ?',
      'ee': 'Woezɔ! Menye wò agblẽnutɔ kpeɖeŋutɔ. Aleke mate ŋu akpe ɖe ŋuwò egbe?',
      'ga': 'Akwaaba! Miyɛ wo kuayɛ boafoɔ. Ke naa mate ŋu aboa wo onnɛ?',
    };
    return greetings[language as keyof typeof greetings] || greetings.en;
  };

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        content: getGreeting(),
        sender: 'bot',
        timestamp: new Date(),
        language
      };
      setMessages([greeting]);
    }
  }, [language, messages.length]);

  const toggleRecording = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.lang = getLanguageCode(language);
      recognition.start();
      setIsRecording(true);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response with agricultural knowledge
    const responses = {
      'en': {
        crop: "For crop cultivation in Ghana, consider the rainy season timing. Plant maize between April-June for best yield.",
        pest: "Common pests in Ghana include armyworms and aphids. Use neem oil or consult your local extension officer.",
        weather: "Monitor weather patterns closely. The harmattan season affects crop growth significantly.",
        market: "Check local market prices regularly. Tomatoes and cassava have good market demand.",
        default: "I'm here to help with your farming questions. Ask me about crops, pests, weather, or markets in Ghana."
      },
      'tw': {
        crop: "Kuayɛ ho nimdeɛ: Kuayɛ bere pa ne osutɔ bere. Aburow dua wɔ Kwapem kɔsi Kuotɔ.",
        pest: "Mmoawa a ɛhaw aduan: Kwatɔ ne aphids. Fa neem ngo anaa kɔ extension officer hɔ.",
        weather: "Ewiem tebea: Harmattan mmerɛ no ka aduan nyin kwan.",
        market: "Gua so: Ntoses ne bankye wɔ gua pa.",
        default: "Mewɔ ha sɛ meboa wo kuayɛ nsɛm ho. Bisa me aduan, mmoawa, ewiem anaa gua ho nsɛm."
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    
    // Simple keyword matching for demo
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('crop') || lowerMessage.includes('plant') || lowerMessage.includes('aduan')) {
      return langResponses.crop;
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('mmoawa')) {
      return langResponses.pest;
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('ewiem')) {
      return langResponses.weather;
    } else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('gua')) {
      return langResponses.market;
    }
    
    return langResponses.default;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await generateAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-gradient-earth border-2">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-primary rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary-foreground" />
          <h3 className="font-semibold text-primary-foreground">
            {language === 'en' ? 'Agricultural Assistant' :
             language === 'tw' ? 'Kuayɛ Boafoɔ' :
             language === 'ee' ? 'Agblẽnutɔ Kpeɖeŋutɔ' :
             language === 'ga' ? 'Kuayɛ Boafoɔ' : 'Agricultural Assistant'}
          </h3>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.sender === 'user' 
                  ? 'bg-secondary' 
                  : 'bg-primary'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-secondary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary">
                <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
            className="shrink-0"
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === 'en' ? 'Type your message or use voice...' :
              language === 'tw' ? 'Kyerɛw wo nkra anaa fa nne...' :
              language === 'ee' ? 'Ŋlɔ wò nya alo zã gbe...' :
              language === 'ga' ? 'Ŋmɛ wo nyɛ kɛ zã gbe...' : 'Type your message...'
            }
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};