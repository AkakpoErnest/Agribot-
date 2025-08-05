import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Cloud, 
  TrendingUp, 
  Building2, 
  Phone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Safe LLM import - won't break the app if it fails
let llmService: any = null;
try {
  const llmModule = require("@/services/llm");
  llmService = llmModule.llmService;
  console.log('LLM service loaded successfully');
} catch (error) {
  console.log('LLM service not available, using built-in responses');
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'expert';
  timestamp: Date;
  language?: string;
  type?: 'text' | 'weather' | 'market' | 'subsidy' | 'expert-request';
  data?: any;
  provider?: string;
  model?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: string;
}

interface MarketData {
  crop: string;
  price: number;
  unit: string;
  location: string;
  trend: 'up' | 'down' | 'stable';
}

interface SubsidyData {
  program: string;
  description: string;
  eligibility: string;
  deadline: string;
  contact: string;
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [subsidyData, setSubsidyData] = useState<SubsidyData[]>([]);
  const [expertMode, setExpertMode] = useState(false);
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

  // Update greeting when language changes
  useEffect(() => {
    const newGreeting: Message = {
      id: Date.now().toString(),
      content: getGreeting(),
      sender: 'bot',
      timestamp: new Date(),
      language
    };
    
    // Add language change notification
    const languageNotification: Message = {
      id: (Date.now() + 1).toString(),
      content: getLanguageChangeMessage(),
      sender: 'bot',
      timestamp: new Date(),
      language
    };
    
    // Replace the first message (greeting) with new language greeting and add notification
    setMessages(prev => {
      if (prev.length > 0 && prev[0].sender === 'bot') {
        return [newGreeting, languageNotification, ...prev.slice(1)];
      }
      return [newGreeting, languageNotification];
    });

    // Update speech recognition language
    if (recognition) {
      recognition.lang = getLanguageCode(language);
    }
  }, [language, recognition]);

  const getLanguageChangeMessage = () => {
    const messages = {
      'en': 'Language changed to English. I can now assist you in English!',
      'tw': 'Yɛɛ wo kasa ayɛ Twi. Metumi aboa wo wɔ Twi kasa mu!',
      'ee': 'Wò gbe sesa ɖe Ewe. Mate ŋu akpe ɖe ŋuwò le Ewe gbe me!',
      'ga': 'Yɛɛ wo kasa ayɛ Ga. Metumi aboa wo wɔ Ga kasa mu!',
    };
    return messages[language as keyof typeof messages] || messages.en;
  };

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

  const generateAIResponse = async (userMessage: string): Promise<{ content: string; provider?: string; model?: string }> => {
    try {
      const request: any = { // Assuming LLMRequest is not defined, using 'any' for now
        prompt: userMessage,
        language: language,
        context: `Agricultural assistant for Ghanaian farmers. Current language: ${language}. Provide helpful, practical advice.`,
        maxTokens: 200
      };

      const response = await llmService.generateResponse(request);
      
      return {
        content: response.content,
        provider: response.provider,
        model: response.model
      };
    } catch (error) {
      console.error('LLM service error:', error);
      // Fallback to simple responses
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
        return { content: langResponses.crop };
      } else if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('mmoawa')) {
        return { content: langResponses.pest };
      } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('ewiem')) {
        return { content: langResponses.weather };
      } else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('gua')) {
        return { content: langResponses.market };
      }
      
      return { content: langResponses.default };
    }
  };

  // Simulate real-time weather data (replace with actual GMet API integration)
  const fetchWeatherData = async (): Promise<WeatherData> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 12,
      forecast: 'Light rain expected in the next 24 hours. Good for planting maize and vegetables.'
    };
  };

  // Simulate real-time market data (replace with actual Esoko API integration)
  const fetchMarketData = async (): Promise<MarketData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { crop: 'Tomatoes', price: 15.50, unit: 'kg', location: 'Kumasi Market', trend: 'up' },
      { crop: 'Cassava', price: 8.20, unit: 'kg', location: 'Accra Market', trend: 'stable' },
      { crop: 'Maize', price: 12.80, unit: 'kg', location: 'Tamale Market', trend: 'down' },
      { crop: 'Yam', price: 18.90, unit: 'kg', location: 'Kumasi Market', trend: 'up' }
    ];
  };

  // Simulate government subsidy data
  const fetchSubsidyData = async (): Promise<SubsidyData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        program: 'Fertilizer Subsidy Program',
        description: '50% subsidy on NPK and Urea fertilizers for registered farmers',
        eligibility: 'Must be a registered farmer with valid ID',
        deadline: 'December 31, 2024',
        contact: 'Ministry of Agriculture: +233 30 266 0000'
      },
      {
        program: 'Mechanization Support',
        description: 'Low-interest loans for farm equipment and machinery',
        eligibility: 'Farmers with 5+ acres of land',
        deadline: 'Ongoing',
        contact: 'Agricultural Development Bank: +233 30 266 1000'
      },
      {
        program: 'Crop Insurance Scheme',
        description: 'Insurance coverage for major crops against weather damage',
        eligibility: 'All registered farmers',
        deadline: 'Before planting season',
        contact: 'Ghana Agricultural Insurance Pool: +233 30 266 2000'
      }
    ];
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
      const response = await generateAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        language,
        provider: response.provider,
        model: response.model
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
                
                {/* Weather Data Display */}
                {message.type === 'weather' && message.data && (
                  <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Weather Update</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                      <div>Temperature: {message.data.temperature}°C</div>
                      <div>Condition: {message.data.condition}</div>
                      <div>Humidity: {message.data.humidity}%</div>
                      <div>Wind: {message.data.windSpeed} km/h</div>
                    </div>
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      {message.data.forecast}
                    </div>
                  </div>
                )}

                {/* Market Data Display */}
                {message.type === 'market' && message.data && (
                  <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Market Prices</span>
                    </div>
                    <div className="space-y-1">
                      {message.data.map((item: MarketData, index: number) => (
                        <div key={index} className="flex justify-between items-center text-xs">
                          <span className="text-green-700">{item.crop}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">₵{item.price}</span>
                            <span className="text-green-600">/{item.unit}</span>
                            <Badge 
                              variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subsidy Data Display */}
                {message.type === 'subsidy' && message.data && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Government Programs</span>
                    </div>
                    <div className="space-y-2">
                      {message.data.map((item: SubsidyData, index: number) => (
                        <div key={index} className="text-xs text-yellow-700 border-l-2 border-yellow-400 pl-2">
                          <div className="font-medium">{item.program}</div>
                          <div className="text-yellow-600">{item.description}</div>
                          <div className="mt-1">
                            <span className="font-medium">Eligibility:</span> {item.eligibility}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {item.deadline}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-yellow-600">{item.contact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert Request Display */}
                {message.type === 'expert-request' && (
                  <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Expert Connection</span>
                    </div>
                    <div className="mt-2 text-xs text-purple-700">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Request submitted successfully</span>
                      </div>
                      <div>An agricultural extension officer will contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

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
        
        {/* Quick Response Buttons */}
        <div className="mt-3 flex flex-wrap gap-2">
          {getQuickQuestions(language).map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setInputMessage(question);
                setTimeout(() => sendMessage(), 100);
              }}
              disabled={isLoading}
              className="text-xs"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const getQuickQuestions = (language: string) => {
  const questions = {
    'en': [
      'Tell me about crops',
      'How to control pests?',
      'Weather forecast',
      'Market prices',
      'Government subsidies',
      'Connect with expert'
    ],
    'tw': [
      'Ka aduan ho nsɛm',
      'Sɛn na yɛɛ mmoawa?',
      'Ewiem forecast',
      'Gua bo',
      'Amanaman ntam subsidy',
      'Ka extension officer ho'
    ],
    'ee': [
      'Ka agblẽnɔnɔ ŋu nyawo',
      'Aleke nàdze nudzrala?',
      'Yame ƒe forecast',
      'Asi ƒe ga',
      'Dukplɔlawo ƒe subsidy',
      'Ka extension officer gbɔ'
    ],
    'ga': [
      'Ka aduan ho nsɛm',
      'Sɛn na yɛɛ mmoawa?',
      'Ewiem forecast',
      'Gua bo',
      'Amanaman ntam subsidy',
      'Ka extension officer ho'
    ]
  };
  return questions[language as keyof typeof questions] || questions.en;
};