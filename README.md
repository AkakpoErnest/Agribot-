# Agribot - Farm Talk Ghana 🌾🇬🇭

**Agribolt** - Multilingual Agricultural AI Assistant

## Project Overview

Agribot is a cutting-edge AI-powered agricultural assistant designed specifically for Ghanaian farmers. It bridges communication gaps in Ghana's agriculture sector by providing multilingual support in Twi, Ewe, Ga, and English.

## Application Flow

```mermaid
graph TD
    A[User Opens App] --> B[Landing Page with Hero Section]
    B --> C[Language Selection]
    C --> D[Choose Language: Twi/Ewe/Ga/English]
    D --> E[AI Chat Interface]
    
    E --> F{User Input Method}
    F -->|Text Input| G[Type Message]
    F -->|Voice Input| H[Voice Recording]
    F -->|Quick Questions| I[Pre-defined Questions]
    
    G --> J[AI Processing]
    H --> K[Speech-to-Text]
    I --> J
    
    K --> J
    J --> L{AI Response Generation}
    
    L -->|LLM Service Available| M[External LLM API]
    L -->|LLM Service Unavailable| N[Built-in Responses]
    
    M --> O[Response in Selected Language]
    N --> O
    
    O --> P[Display Response]
    P --> Q{Continue Conversation?}
    Q -->|Yes| E
    Q -->|No| R[End Session]
    
    subgraph "Language Support"
        S1[Twi - Akan Language]
        S2[Ewe - Volta Region]
        S3[Ga - Greater Accra]
        S4[English - International]
    end
    
    subgraph "AI Features"
        T1[Crop Advice]
        T2[Pest Management]
        T3[Weather Information]
        T4[Market Prices]
        T5[Soil Management]
        T6[Fertilizer Guidance]
    end
    
    subgraph "Voice Features"
        U1[Speech Recognition]
        U2[Voice Commands]
        U3[Multi-language Voice]
        U4[Real-time Transcription]
    end
```

## User Journey Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Language Selector
    participant C as Chat Interface
    participant AI as AI Assistant
    participant V as Voice System
    
    U->>L: Select Language (Twi/Ewe/Ga/English)
    L->>C: Update Interface Language
    C->>AI: Initialize with Language
    
    Note over U,AI: Text Input Path
    U->>C: Type Question
    C->>AI: Process Text Input
    AI->>C: Generate Response
    C->>U: Display Response
    
    Note over U,AI: Voice Input Path
    U->>V: Start Voice Recording
    V->>C: Convert Speech to Text
    C->>AI: Process Voice Input
    AI->>C: Generate Response
    C->>U: Display Response
    
    Note over U,AI: Quick Questions Path
    U->>C: Select Quick Question
    C->>AI: Process Pre-defined Question
    AI->>C: Generate Response
    C->>U: Display Response
```

### Key Features
- 🤖 **AI Agricultural Assistant** - Get instant answers about crops, pests, and farming techniques
- 🔊 **AI Voice Channel** - Give voice commands to AI for various farming tasks
- 🎤 **Voice Communication** - Speak in your local language and get responses
- 🌍 **Multi-language Support** - Available in Twi, Ewe, Ga, and English
- 📱 **Modern UI/UX** - Beautiful Ghana-themed design with agricultural colors
- 🎯 **Smart Response System** - Fallback from external LLM to built-in responses
- 🔄 **Real-time Language Switching** - Seamless language transitions
- 📊 **Quick Question Buttons** - Pre-defined agricultural queries

### Target Users
- Ghanaian farmers who need agricultural advice
- Extension officers providing farming support
- Agricultural customers seeking market information
- Anyone needing farming guidance in local languages

## Technology Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React 18 + TypeScript]
        B[Vite Build Tool]
        C[Tailwind CSS + shadcn/ui]
        D[React Router DOM]
    end
    
    subgraph "AI Layer"
        E[LLM Service Integration]
        F[Built-in Response System]
        G[Speech Recognition API]
        H[Language Processing]
    end
    
    subgraph "State Management"
        I[React Hooks]
        J[Context API]
        K[Local State]
    end
    
    subgraph "External Services"
        L[Web Speech API]
        M[Optional LLM APIs]
        N[Browser APIs]
    end
    
    A --> E
    A --> F
    A --> G
    E --> M
    F --> H
    G --> L
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Modern browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkakpoErnest/Agribot-.git
   cd Agribot-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

This project is built with modern web technologies:

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **React Router DOM** for client-side routing

### Styling & UI
- **Tailwind CSS** with custom Ghana theme
- **shadcn/ui** for consistent component library
- **Lucide React** for beautiful icons
- **Custom gradients** and Ghana-themed colors

### State Management
- **React Hooks** for local state management
- **React Query** for data fetching and caching
- **Context API** for global state

### AI & Voice Features
- **Web Speech API** for speech recognition
- **Custom LLM integration** with fallback system
- **Multi-language support** with language detection
- **Built-in agricultural knowledge base**

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Autoprefixer** for browser compatibility

## Features in Detail

### 🌍 Multilingual Support
- **English** - International language support
- **Twi** - Most widely spoken local language in Ghana
- **Ewe** - Spoken in Volta Region
- **Ga** - Spoken in Greater Accra Region

### 🤖 AI Agricultural Assistant
- Crop cultivation advice and timing
- Pest management recommendations
- Weather pattern analysis
- Market price information
- Local farming best practices
- Soil management guidance
- Fertilizer recommendations
- Irrigation advice
- Harvest timing
- Storage solutions

### 🔊 AI Voice Channel
- Voice command recognition for farming tasks
- Hands-free operation for field work
- Task automation through voice instructions
- Multi-language voice command support
- Context-aware farming assistance

### 🎤 Voice Communication
- Real-time speech-to-text conversion
- Voice recording and transcription
- Language-specific speech recognition
- Natural language processing for agricultural queries

### 📱 Responsive Design
- Mobile-first approach
- Ghana-themed color scheme
- Intuitive user interface
- Cross-platform compatibility

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── LanguageSelector.tsx # Language selection
│   ├── FeatureShowcase.tsx  # Feature display
│   └── VoiceRecorder.tsx    # Voice recording
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection
│   └── use-toast.ts    # Toast notifications
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
├── services/           # External services
│   └── llm.ts          # LLM integration
├── types/              # TypeScript definitions
│   └── speech.d.ts     # Speech API types
└── assets/             # Static assets
    └── agribot-hero.jpg # Hero image
```

## AI Response System

The application uses a sophisticated AI response system with multiple fallback layers:

```mermaid
graph LR
    A[User Input] --> B{LLM Service Available?}
    B -->|Yes| C[External LLM API]
    B -->|No| D[Built-in Response System]
    
    C --> E{Response Success?}
    E -->|Yes| F[Return LLM Response]
    E -->|No| D
    
    D --> G[Keyword Matching]
    G --> H[Language-Specific Responses]
    H --> I[Return Local Response]
    
    F --> J[Display to User]
    I --> J
```

### Response Categories
- **Crop Management** - Planting, growing, harvesting advice
- **Pest Control** - Identification and treatment methods
- **Weather Guidance** - Seasonal farming recommendations
- **Market Information** - Price trends and market access
- **Soil Health** - Testing and improvement techniques
- **Fertilizer Use** - Application methods and timing
- **Irrigation** - Water management strategies
- **Storage Solutions** - Post-harvest preservation

## Voice Recognition Flow

```mermaid
graph TD
    A[User Clicks Voice Button] --> B{Speech API Available?}
    B -->|Yes| C[Initialize Recognition]
    B -->|No| D[Show Error Message]
    
    C --> E[Set Language Code]
    E --> F[Start Recording]
    F --> G[Process Speech]
    G --> H[Convert to Text]
    H --> I[Send to AI]
    I --> J[Generate Response]
    J --> K[Display Response]
    
    D --> L[Fallback to Text Input]
```

## Contributing

We welcome contributions to improve Agribot! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure multi-language support for new features

### Localization Guidelines
- All user-facing text must support all four languages
- Use consistent terminology across languages
- Test voice recognition in all supported languages
- Maintain cultural sensitivity in responses

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Environment Variables
Create a `.env` file for production:
```env
VITE_APP_TITLE=Agribot - Farm Talk Ghana
VITE_LLM_API_URL=your_llm_api_url
VITE_LLM_API_KEY=your_llm_api_key
```

## Performance Optimization

### Current Optimizations
- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Compressed hero image
- **Bundle Analysis** - Optimized dependencies
- **Caching Strategy** - React Query for data caching

### Future Optimizations
- **Service Worker** - Offline functionality
- **Progressive Web App** - Installable app
- **CDN Integration** - Faster asset delivery
- **Database Integration** - User session storage

## Testing Strategy

### Manual Testing Checklist
- [ ] Language switching functionality
- [ ] Voice recognition in all languages
- [ ] AI response generation
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Offline functionality
- [ ] Error handling

### Automated Testing (Future)
- Unit tests for components
- Integration tests for AI features
- E2E tests for user flows
- Performance testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## Acknowledgments

- Ghanaian farmers and agricultural experts
- Local language consultants
- Open source community
- Agricultural extension services
- Web Speech API contributors
- React and Vite communities

---

**Made with ❤️ for Ghana's agricultural community**

*Empowering farmers through technology and local language support*
