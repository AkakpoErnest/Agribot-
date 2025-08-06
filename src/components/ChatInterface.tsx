import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle,
  Mail,
  Clock
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
        contact: 'Ministry of Food and Agriculture: 0302-665-000'
      },
      {
        program: 'Planting for Food and Jobs',
        description: 'Free seeds and technical support for maize, rice, and vegetable farmers',
        eligibility: 'Smallholder farmers with less than 5 acres',
        deadline: 'Ongoing',
        contact: 'MoFA Extension Services: 0302-665-001'
      }
    ];
  };

  // Helper function to generate weather response
  const getWeatherResponse = (language: string, weatherData: WeatherData): string => {
    const responses = {
      'en': `🌤️ Current Weather: ${weatherData.condition}, ${weatherData.temperature}°C\n💧 Humidity: ${weatherData.humidity}%\n💨 Wind: ${weatherData.windSpeed} km/h\n🌱 Farming Advice: ${weatherData.forecast}`,
      'tw': `🌤️ Ewiem tebea: ${weatherData.condition}, ${weatherData.temperature}°C\n💧 Humidity: ${weatherData.humidity}%\n💨 Mframa: ${weatherData.windSpeed} km/h\n🌱 Kuayɛ afotu: ${weatherData.forecast}`,
      'ee': `🌤️ Yame ƒe nɔnɔme: ${weatherData.condition}, ${weatherData.temperature}°C\n💧 Nɔ ƒe nɔnɔme: ${weatherData.humidity}%\n💨 Mframa: ${weatherData.windSpeed} km/h\n🌱 Agblẽnɔnɔ ɖoɖo: ${weatherData.forecast}`,
      'ga': `🌤️ Ewiem tebea: ${weatherData.condition}, ${weatherData.temperature}°C\n💧 Humidity: ${weatherData.humidity}%\n💨 Mframa: ${weatherData.windSpeed} km/h\n🌱 Kuayɛ afotu: ${weatherData.forecast}`
    };
    return responses[language as keyof typeof responses] || responses.en;
  };

  // Helper function to generate market response
  const getMarketResponse = (language: string, marketData: MarketData[]): string => {
    const marketList = marketData.map(item => 
      `${item.crop}: ${item.price} GHS/${item.unit} (${item.location}) ${item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}`
    ).join('\n');
    
    const responses = {
      'en': `📊 Current Market Prices:\n${marketList}\n\n💡 Tip: Prices are updated daily. Check local markets for the most current rates.`,
      'tw': `📊 Gua bo a ɛrekɔ so:\n${marketList}\n\n💡 Afotu: Bo sesa daa. Kɔ wo amantɔ gua hɔ na wo nya bo pa.`,
      'ee': `📊 Asi ƒe ga home:\n${marketList}\n\n💡 ɖoɖo: Ga sesa daa. Kɔ wò nutɔwo ƒe asi hã eye nàxɔ ga nyuie.`,
      'ga': `📊 Gua bo a ɛrekɔ so:\n${marketList}\n\n💡 Afotu: Bo sesa daa. Kɔ wo amantɔ gua hɔ na wo nya bo pa.`
    };
    return responses[language as keyof typeof responses] || responses.en;
  };

  // Helper function to generate subsidy response
  const getSubsidyResponse = (language: string, subsidyData: SubsidyData[]): string => {
    const subsidyList = subsidyData.map(item => 
      `🏛️ ${item.program}\n📝 ${item.description}\n✅ Eligibility: ${item.eligibility}\n⏰ Deadline: ${item.deadline}\n📞 Contact: ${item.contact}`
    ).join('\n\n');
    
    const responses = {
      'en': `🏛️ Government Agricultural Programs:\n\n${subsidyList}\n\n💡 Apply early as programs have limited slots.`,
      'tw': `🏛️ Amanaman ntam kuayɛ program:\n\n${subsidyList}\n\n💡 Sɔ wo application ntɛm efisɛ program wɔ slot kakra.`,
      'ee': `🏛️ Dukplɔlawo ƒe agblẽnɔnɔ programwo:\n\n${subsidyList}\n\n💡 Sɔ wò application enumake efisɛ programwo le slot kakra.`,
      'ga': `🏛️ Amanaman ntam kuayɛ program:\n\n${subsidyList}\n\n💡 Sɔ wo application ntɛm efisɛ program wɔ slot kakra.`
    };
    return responses[language as keyof typeof responses] || responses.en;
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
      // Check if this is an expert connection request
      const lowerMessage = inputMessage.toLowerCase();
      const isExpertRequest = lowerMessage.includes('expert') || 
                             lowerMessage.includes('extension') || 
                             lowerMessage.includes('officer') ||
                             lowerMessage.includes('connect') ||
                             lowerMessage.includes('ka extension officer ho') ||
                             lowerMessage.includes('ka extension officer gbɔ');

      if (isExpertRequest) {
        // Handle expert connection request
        const expertMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getExpertConnectionMessage(),
          sender: 'bot',
          timestamp: new Date(),
          language,
          type: 'expert-request',
          data: {
            expertName: 'Kwame Asante',
            expertPhone: '+233 24 123 4567',
            expertEmail: 'kwame.asante@agric.gov.gh',
            responseTime: '24 hours',
            requestId: `EXP-${Date.now()}`
          }
        };

        setMessages(prev => [...prev, expertMessage]);
      }
      // Check for weather-related queries
      else if (lowerMessage.includes('weather') || lowerMessage.includes('ewiem') || lowerMessage.includes('yame') || lowerMessage.includes('forecast')) {
        const weatherData = await fetchWeatherData();
        const weatherResponse = getWeatherResponse(language, weatherData);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: weatherResponse,
          sender: 'bot',
          timestamp: new Date(),
          language,
          type: 'weather',
          data: weatherData
        };

        setMessages(prev => [...prev, botMessage]);
      }
      // Check for market-related queries
      else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('gua') || lowerMessage.includes('asi')) {
        const marketData = await fetchMarketData();
        const marketResponse = getMarketResponse(language, marketData);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: marketResponse,
          sender: 'bot',
          timestamp: new Date(),
          language,
          type: 'market',
          data: marketData
        };

        setMessages(prev => [...prev, botMessage]);
      }
      // Check for subsidy-related queries
      else if (lowerMessage.includes('subsidy') || lowerMessage.includes('government') || lowerMessage.includes('amanaman')) {
        const subsidyData = await fetchSubsidyData();
        const subsidyResponse = getSubsidyResponse(language, subsidyData);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: subsidyResponse,
          sender: 'bot',
          timestamp: new Date(),
          language,
          type: 'subsidy',
          data: subsidyData
        };

        setMessages(prev => [...prev, botMessage]);
      }
      // Default AI response for other queries
      else {
        // Handle regular AI response
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
      }
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

  const getExpertConnectionMessage = () => {
    const messages = {
      'en': 'I\'ve connected you with an agricultural extension officer. Here are the contact details:',
      'tw': 'Meka wo extension officer ho. Hena contact details:',
      'ee': 'Meka wò extension officer gbɔ. Ame contact details:',
      'ga': 'Meka wo extension officer ho. Hena contact details:'
    };
    return messages[language as keyof typeof messages] || messages.en;
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
                {message.type === 'expert-request' && message.data && (
                  <div className="mt-3 p-3 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">
                        {language === 'en' ? 'Extension Officer Contact' :
                         language === 'tw' ? 'Extension Officer Contact' :
                         language === 'ee' ? 'Extension Officer Contact' :
                         language === 'ga' ? 'Extension Officer Contact' : 'Extension Officer Contact'}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs text-purple-700">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span><strong>Name:</strong> {message.data.expertName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span><strong>Phone:</strong> </span>
                        <a 
                          href={`tel:${message.data.expertPhone}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {message.data.expertPhone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span><strong>Email:</strong> {message.data.expertEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span><strong>Response Time:</strong> {message.data.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        <span><strong>Request ID:</strong> {message.data.requestId}</span>
                      </div>
                      <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                        <strong>
                          {language === 'en' ? 'How to call:' :
                           language === 'tw' ? 'Sɛn na yɛɛ call:' :
                           language === 'ee' ? 'Ame ŋu call:' :
                           language === 'ga' ? 'Sɛn na yɛɛ call:' : 'How to call:'}
                        </strong>
                        <div className="mt-1 space-y-1">
                          {language === 'en' ? (
                            <>
                              <div>1. Dial the phone number above</div>
                              <div>2. Introduce yourself as a farmer</div>
                              <div>3. Mention your request ID</div>
                              <div>4. Ask your agricultural question</div>
                            </>
                          ) : language === 'tw' ? (
                            <>
                              <div>1. Fa phone number a ɛwɔ soro</div>
                              <div>2. Ka wo ho sɛ kuayɛni</div>
                              <div>3. Ka wo request ID</div>
                              <div>4. Bisa wo kuayɛ nsɛm</div>
                            </>
                          ) : language === 'ee' ? (
                            <>
                              <div>1. Zã phone number si le dzi ŋu</div>
                              <div>2. Ŋlɔ wò ŋkɔ sɛ agblẽla</div>
                              <div>3. Ŋlɔ wò request ID</div>
                              <div>4. Bia wò agblẽnɔnɔ nya</div>
                            </>
                          ) : language === 'ga' ? (
                            <>
                              <div>1. Fa phone number a ɛwɔ soro</div>
                              <div>2. Ka wo ho sɛ kuayɛni</div>
                              <div>3. Ka wo request ID</div>
                              <div>4. Bisa wo kuayɛ nsɛm</div>
                            </>
                          ) : (
                            <>
                              <div>1. Dial the phone number above</div>
                              <div>2. Introduce yourself as a farmer</div>
                              <div>3. Mention your request ID</div>
                              <div>4. Ask your agricultural question</div>
                            </>
                          )}
                        </div>
                      </div>
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