# Agribot - Farm Talk Ghana 🌾🇬🇭

**Agribolt** - Multilingual Agricultural AI Assistant

## Project Overview

Agribot is a cutting-edge AI-powered agricultural assistant designed specifically for Ghanaian farmers. It bridges communication gaps in Ghana's agriculture sector by providing multilingual support in Twi, Ewe, Ga, and English.

### Key Features
- 🤖 **AI Agricultural Assistant** - Get instant answers about crops, pests, and farming techniques
- 🎤 **Voice Communication** - Speak in your local language and get responses
- 🌍 **Multi-language Support** - Available in Twi, Ewe, Ga, and English
- 📱 **Modern UI/UX** - Beautiful Ghana-themed design with agricultural colors

### Target Users
- Ghanaian farmers who need agricultural advice
- Extension officers providing farming support
- Agricultural customers seeking market information
- Anyone needing farming guidance in local languages

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

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
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom Ghana theme
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **Speech Recognition**: Web Speech API

## Features in Detail

### 🌍 Multilingual Support
- **English** - International language support
- **Twi** - Most widely spoken local language in Ghana
- **Ewe** - Spoken in Volta Region
- **Ga** - Spoken in Greater Accra Region

### 🎤 Voice Communication
- Real-time speech-to-text conversion
- Voice recording and transcription
- Language-specific speech recognition
- Natural language processing for agricultural queries

### 🤖 AI Agricultural Assistant
- Crop cultivation advice and timing
- Pest management recommendations
- Weather pattern analysis
- Market price information
- Local farming best practices

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
│   ├── ChatInterface.tsx
│   ├── LanguageSelector.tsx
│   ├── FeatureShowcase.tsx
│   └── VoiceRecorder.tsx
├── pages/              # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Static assets
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

---

**Made with ❤️ for Ghana's agricultural community**
