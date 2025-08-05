// Safe LLM Service for Agribot - Farm Talk Ghana
// Minimal implementation that won't break the app

export interface LLMResponse {
  text: string;
  confidence: number;
  provider: string;
}

export interface LLMRequest {
  prompt: string;
  language: 'en' | 'tw' | 'ee' | 'ga';
}

// Simple fallback provider that always works
class SafeFallbackProvider {
  private responses: Record<string, Record<string, string[]>> = {
    en: {
      greeting: [
        "Hello! I'm Agribot, your farming assistant. How can I help you today?",
        "Welcome to Agribot! I'm here to help with your farming questions.",
        "Hi there! I'm ready to assist you with agricultural advice."
      ],
      weather: [
        "I can help you with weather information for your farming activities.",
        "Weather plays a crucial role in farming. What specific weather information do you need?",
        "Let me know your location and I can provide weather advice for your crops."
      ],
      crops: [
        "I can provide advice on various crops including maize, cassava, yam, and vegetables.",
        "What crop are you interested in? I can help with planting, care, and harvesting tips.",
        "Different crops have different requirements. Tell me what you're growing!"
      ],
      pests: [
        "Pest management is crucial for healthy crops. What pests are you dealing with?",
        "I can help you identify and control common agricultural pests.",
        "Let me know what crops you're growing and I can provide pest control advice."
      ],
      default: [
        "I'm here to help with your farming questions. Could you be more specific?",
        "That's an interesting question about farming. Let me help you with that.",
        "I'm your agricultural assistant. How can I help you today?"
      ]
    },
    tw: {
      greeting: [
        "Agoo! Me yɛ Agribot, wo kuayɛ adwumayɛfo. Me bɛtumi akyerɛ wo den?",
        "Akwaaba Agribot! Me wɔ ha ma me bɛkyerɛ wo kuayɛ asɛm.",
        "Agoo! Me yɛ ready ma me bɛkyerɛ wo kuayɛ adwuma."
      ],
      weather: [
        "Me bɛtumi akyerɛ wo soro asɛm ma wo kuayɛ adwuma.",
        "Soro yɛ adwuma wɔ kuayɛ mu. Wo pɛ soro asɛm bɛn?",
        "Ka kyerɛ me wo baabi na me bɛtumi akyerɛ wo soro advice."
      ],
      crops: [
        "Me bɛtumi akyerɛ wo aburo, bankye, yam, ne vegetables ho advice.",
        "Wo pɛ crop bɛn? Me bɛtumi akyerɛ wo planting, care, ne harvesting.",
        "Crops biara wɔ ne requirements. Ka kyerɛ me wo yɛ den!"
      ],
      default: [
        "Me wɔ ha ma me bɛkyerɛ wo kuayɛ asɛm. Wo bɛtumi aka kyerɛ me?",
        "Wo kuayɛ asɛm yɛ interesting. Ma me bɛkyerɛ wo.",
        "Me yɛ wo kuayɛ adwumayɛfo. Me bɛtumi akyerɛ wo den?"
      ]
    },
    ee: {
      greeting: [
        "Woezɔ! Nye Agribot, wo dɔwɔwɔ gbɔgblɔla. Nye bɛtumi akpɔ wo nu?",
        "Akpe Agribot! Nye le afi ma nye bɛkpe wo dɔwɔwɔ nyawo.",
        "Woezɔ! Nye ready ma nye bɛkpe wo dɔwɔwɔ dɔwɔwɔ."
      ],
      weather: [
        "Nye bɛtumi akpɔ wo dzɔdzɔe nyanya ma wo dɔwɔwɔ dɔwɔwɔ.",
        "Dzɔdzɔe le dɔwɔwɔ nu. Wo pɛ dzɔdzɔe nyanya bɛn?",
        "Kpɔ nye wo fe afi na nye bɛtumi akpɔ wo dzɔdzɔe advice."
      ],
      default: [
        "Nye le afi ma nye bɛkpe wo dɔwɔwɔ nyawo. Wo bɛtumi akpɔ nye nu?",
        "Wo dɔwɔwɔ nyawo yɛ interesting. Ma nye bɛkpe wo.",
        "Nye nye wo dɔwɔwɔ gbɔgblɔla. Nye bɛtumi akpɔ wo nu?"
      ]
    },
    ga: {
      greeting: [
        "Agoo! Me yɛ Agribot, wo kuayɛ adwumayɛfo. Me bɛtumi akyerɛ wo den?",
        "Akwaaba Agribot! Me wɔ ha ma me bɛkyerɛ wo kuayɛ asɛm.",
        "Agoo! Me yɛ ready ma me bɛkyerɛ wo kuayɛ adwuma."
      ],
      weather: [
        "Me bɛtumi akyerɛ wo soro asɛm ma wo kuayɛ adwuma.",
        "Soro yɛ adwuma wɔ kuayɛ mu. Wo pɛ soro asɛm bɛn?",
        "Ka kyerɛ me wo baabi na me bɛtumi akyerɛ wo soro advice."
      ],
      default: [
        "Me wɔ ha ma me bɛkyerɛ wo kuayɛ asɛm. Wo bɛtumi aka kyerɛ me?",
        "Wo kuayɛ asɛm yɛ interesting. Ma me bɛkyerɛ wo.",
        "Me yɛ wo kuayɛ adwumayɛfo. Me bɛtumi akyerɛ wo den?"
      ]
    }
  };

  generateResponse(request: LLMRequest): LLMResponse {
    const language = request.language;
    const prompt = request.prompt.toLowerCase();
    
    // Determine response category based on prompt content
    let category = 'default';
    if (prompt.includes('hello') || prompt.includes('hi') || prompt.includes('agoo') || prompt.includes('woezɔ')) {
      category = 'greeting';
    } else if (prompt.includes('weather') || prompt.includes('soro') || prompt.includes('dzɔdzɔe')) {
      category = 'weather';
    } else if (prompt.includes('crop') || prompt.includes('plant') || prompt.includes('aburo') || prompt.includes('bankye')) {
      category = 'crops';
    } else if (prompt.includes('pest') || prompt.includes('insect') || prompt.includes('disease')) {
      category = 'pests';
    }

    const responses = this.responses[language]?.[category] || this.responses[language]?.default || this.responses.en.default;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      text: randomResponse,
      confidence: 0.8,
      provider: 'safe-fallback'
    };
  }
}

// Main LLM Service - Safe and Simple
export class LLMService {
  private fallback: SafeFallbackProvider;

  constructor() {
    this.fallback = new SafeFallbackProvider();
  }

  async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    // For now, just use the safe fallback
    // This ensures the app never breaks
    return this.fallback.generateResponse(request);
  }

  async getAvailableProviders(): Promise<string[]> {
    return ['safe-fallback'];
  }
}

// Export singleton instance
export const llmService = new LLMService();
export default llmService; 