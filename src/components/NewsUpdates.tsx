import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Newspaper, 
  CloudRain, 
  TrendingUp, 
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'weather' | 'market' | 'alert';
  date: string;
  priority: 'high' | 'medium' | 'low';
  language: string;
}

interface NewsUpdatesProps {
  language: string;
}

export const NewsUpdates = ({ language }: NewsUpdatesProps) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'news' | 'weather' | 'market' | 'alert'>('all');

  useEffect(() => {
    // Simulate fetching news data
    const fetchNews = async () => {
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: language === 'en' ? 'New Fertilizer Subsidy Program Announced' :
                 language === 'tw' ? 'Fertilizer Subsidy Program Foforɔ' :
                 language === 'ee' ? 'Fertilizer Subsidy Program Yeye' :
                 language === 'ga' ? 'Fertilizer Subsidy Program Foforɔ' :
                 language === 'da' ? 'Fertilizer Subsidy Program Foforɔ' :
                 language === 'fa' ? 'Fertilizer Subsidy Program Foforɔ' : 'New Fertilizer Subsidy Program',
          content: language === 'en' ? 'The Ministry of Agriculture has announced a new 50% subsidy on NPK and Urea fertilizers for registered farmers. Applications open from next month.' :
                   language === 'tw' ? 'Kuayɛ Ministry ayɛ fertilizer subsidy 50% ma registered farmers. Application bɛfi bosome a ɛba so ase.' :
                   language === 'ee' ? 'Agblẽnɔnɔ Ministry ɖe fertilizer subsidy 50% na agblẽnɔlawo siwo le dɔwɔwɔ me. Application bɛdze ɣleti si le dɔwɔwɔ me.' :
                   language === 'ga' ? 'Kuayɛ Ministry ayɛ fertilizer subsidy 50% ma registered farmers. Application bɛfi bosome a ɛba so ase.' :
                   language === 'da' ? 'Kuayɛ Ministry ayɛ fertilizer subsidy 50% ma registered farmers. Application bɛfi bosome a ɛba so ase.' :
                   language === 'fa' ? 'Kuayɛ Ministry ayɛ fertilizer subsidy 50% ma registered farmers. Application bɛfi bosome a ɛba so ase.' : 'New fertilizer subsidy program',
          category: 'news',
          date: '2024-01-15',
          priority: 'high',
          language
        },
        {
          id: '2',
          title: language === 'en' ? 'Heavy Rainfall Expected This Week' :
                 language === 'tw' ? 'Nsutɔ Kɛseɛ Bɛba Saa Wiik Yi' :
                 language === 'ee' ? 'Nɔ ƒe Kɛse Bɛdze Ɣleti Sia' :
                 language === 'ga' ? 'Nsutɔ Kɛseɛ Bɛba Saa Wiik Yi' :
                 language === 'da' ? 'Nsutɔ Kɛseɛ Bɛba Saa Wiik Yi' :
                 language === 'fa' ? 'Nsutɔ Kɛseɛ Bɛba Saa Wiik Yi' : 'Heavy Rainfall Expected',
          content: language === 'en' ? 'Weather forecast predicts heavy rainfall across major farming regions. Farmers advised to delay planting and protect existing crops.' :
                   language === 'tw' ? 'Ewiem forecast ka nsutɔ kɛseɛ bɛba kuayɛ mpɔtam nyinaa. Akuafoɔ wɔ advice ma wo nka dua na wo hwɛ aduan a ɛwɔ hɔ.' :
                   language === 'ee' ? 'Yame forecast ɖe nɔ kɛse bɛdze agblẽnɔnɔ nutɔwo nyinaa. Agblẽnɔlawo wɔ advice ma wo nka ɖe eye wo hã agblẽnɔnɔ siwo le dɔwɔwɔ.' :
                   language === 'ga' ? 'Ewiem forecast ka nsutɔ kɛseɛ bɛba kuayɛ mpɔtam nyinaa. Akuafoɔ wɔ advice ma wo nka dua na wo hwɛ aduan a ɛwɔ hɔ.' :
                   language === 'da' ? 'Ewiem forecast ka nsutɔ kɛseɛ bɛba kuayɛ mpɔtam nyinaa. Akuafoɔ wɔ advice ma wo nka dua na wo hwɛ aduan a ɛwɔ hɔ.' :
                   language === 'fa' ? 'Ewiem forecast ka nsutɔ kɛseɛ bɛba kuayɛ mpɔtam nyinaa. Akuafoɔ wɔ advice ma wo nka dua na wo hwɛ aduan a ɛwɔ hɔ.' : 'Heavy rainfall expected',
          category: 'weather',
          date: '2024-01-14',
          priority: 'high',
          language
        },
        {
          id: '3',
          title: language === 'en' ? 'Tomato Prices Rise by 25%' :
                 language === 'tw' ? 'Ntoses Bo So 25%' :
                 language === 'ee' ? 'Ntoses ƒe Ga ƒo 25%' :
                 language === 'ga' ? 'Ntoses Bo So 25%' :
                 language === 'da' ? 'Ntoses Bo So 25%' :
                 language === 'fa' ? 'Ntoses Bo So 25%' : 'Tomato Prices Rise',
          content: language === 'en' ? 'Tomato prices have increased significantly in major markets. Kumasi market shows highest prices at GH₵ 18 per kg.' :
                   language === 'tw' ? 'Ntoses bo so kɛseɛ wɔ gua kɛseɛ mu. Kumasi gua ka bo kɛseɛ wɔ GH₵ 18 ma kg biara.' :
                   language === 'ee' ? 'Ntoses ƒe ga ƒo kɛse le asi kɛsewo me. Kumasi asi ka ga kɛse le GH₵ 18 na kg biako.' :
                   language === 'ga' ? 'Ntoses bo so kɛseɛ wɔ gua kɛseɛ mu. Kumasi gua ka bo kɛseɛ wɔ GH₵ 18 ma kg biara.' :
                   language === 'da' ? 'Ntoses bo so kɛseɛ wɔ gua kɛseɛ mu. Kumasi gua ka bo kɛseɛ wɔ GH₵ 18 ma kg biara.' :
                   language === 'fa' ? 'Ntoses bo so kɛseɛ wɔ gua kɛseɛ mu. Kumasi gua ka bo kɛseɛ wɔ GH₵ 18 ma kg biara.' : 'Tomato prices increased',
          category: 'market',
          date: '2024-01-13',
          priority: 'medium',
          language
        },
        {
          id: '4',
          title: language === 'en' ? 'Pest Alert: Armyworm Infestation Detected' :
                 language === 'tw' ? 'Mmoawa Alert: Kwatɔ Ahyɛ' :
                 language === 'ee' ? 'Nudzrala Alert: Kwatɔ ƒe Dɔwɔwɔ' :
                 language === 'ga' ? 'Mmoawa Alert: Kwatɔ Ahyɛ' :
                 language === 'da' ? 'Mmoawa Alert: Kwatɔ Ahyɛ' :
                 language === 'fa' ? 'Mmoawa Alert: Kwatɔ Ahyɛ' : 'Pest Alert: Armyworm',
          content: language === 'en' ? 'Armyworm infestation detected in Ashanti region. Farmers advised to monitor crops and apply recommended pesticides immediately.' :
                   language === 'tw' ? 'Kwatɔ ahyɛ wɔ Ashanti mpɔtam. Akuafoɔ wɔ advice ma wo hwɛ aduan na wo fa pesticide a wo ayɛ.' :
                   language === 'ee' ? 'Kwatɔ ƒe dɔwɔwɔ le Ashanti nutɔ me. Agblẽnɔlawo wɔ advice ma wo kpɔ agblẽnɔnɔ eye wo zã pesticide siwo woayɛ.' :
                   language === 'ga' ? 'Kwatɔ ahyɛ wɔ Ashanti mpɔtam. Akuafoɔ wɔ advice ma wo hwɛ aduan na wo fa pesticide a wo ayɛ.' :
                   language === 'da' ? 'Kwatɔ ahyɛ wɔ Ashanti mpɔtam. Akuafoɔ wɔ advice ma wo hwɛ aduan na wo fa pesticide a wo ayɛ.' :
                   language === 'fa' ? 'Kwatɔ ahyɛ wɔ Ashanti mpɔtam. Akuafoɔ wɔ advice ma wo hwɛ aduan na wo fa pesticide a wo ayɛ.' : 'Armyworm infestation detected',
          category: 'alert',
          date: '2024-01-12',
          priority: 'high',
          language
        }
      ];

      setNewsItems(mockNews);
    };

    fetchNews();
  }, [language]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news': return <Newspaper className="h-4 w-4" />;
      case 'weather': return <CloudRain className="h-4 w-4" />;
      case 'market': return <TrendingUp className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Newspaper className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-blue-500';
      case 'weather': return 'bg-cyan-500';
      case 'market': return 'bg-green-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getText = (key: string) => {
    const texts = {
      all: { 
        en: 'All', 
        tw: 'Nyinaa', 
        ee: 'Nyinaa', 
        ga: 'Nyinaa', 
        da: 'Nyinaa',
        fa: 'Nyinaa'
      },
      news: { 
        en: 'News', 
        tw: 'Nsɛm', 
        ee: 'Nyawo', 
        ga: 'Nsɛm', 
        da: 'Nsɛm',
        fa: 'Nsɛm'
      },
      weather: { 
        en: 'Weather', 
        tw: 'Ewiem', 
        ee: 'Yame', 
        ga: 'Ewiem', 
        da: 'Ewiem',
        fa: 'Ewiem'
      },
      market: { 
        en: 'Market', 
        tw: 'Gua', 
        ee: 'Asi', 
        ga: 'Gua', 
        da: 'Gua',
        fa: 'Gua'
      },
      alerts: { 
        en: 'Alerts', 
        tw: 'Alert', 
        ee: 'Alert', 
        ga: 'Alert', 
        da: 'Alert',
        fa: 'Alert'
      }
    };

    return texts[key]?.[language] || texts[key]?.en || key;
  };

  const getTitle = () => {
    return language === 'en' ? 'News & Updates' :
           language === 'tw' ? 'Nsɛm ne Nsɛm Foforɔ' :
           language === 'ee' ? 'Nyawo kple Nyawo Yeye' :
           language === 'ga' ? 'Nsɛm ne Nsɛm Foforɔ' :
           language === 'da' ? 'Nsɛm ne Nsɛm Foforɔ' :
           language === 'fa' ? 'Nsɛm ne Nsɛm Foforɔ' : 'News & Updates';
  };

  const getDescription = () => {
    return language === 'en' ? 'Stay informed with latest updates' :
           language === 'tw' ? 'Hwɛ nsɛm foforɔ wɔ kuayɛ, ewiem, ne gua ho' :
           language === 'ee' ? 'Hwɛ nyawo yeye wɔ agbledede, yame, kple asi ŋu' :
           language === 'ga' ? 'Hwɛ nsɛm foforɔ wɔ kuayɛ, ewiem, ne gua ho' :
           language === 'da' ? 'Hwɛ nsɛm foforɔ wɔ kuayɛ, ewiem, ne gua ho' :
           language === 'fa' ? 'Hwɛ nsɛm foforɔ wɔ kuayɛ, ewiem, ne gua ho' : 'Stay informed with latest updates';
  };

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const categories = [
    { key: 'all', label: getText('all') },
    { key: 'news', label: getText('news') },
    { key: 'weather', label: getText('weather') },
    { key: 'market', label: getText('market') },
    { key: 'alert', label: getText('alerts') }
  ];

  const getReadMoreText = () => {
    return language === 'en' ? 'Read More' :
           language === 'tw' ? 'Kenkan Bio' :
           language === 'ee' ? 'Xlẽe Bio' :
           language === 'ga' ? 'Kenkan Bio' :
           language === 'da' ? 'Kenkan Bio' : 'Read More';
  };

  const getViewAllText = () => {
    return language === 'en' ? 'View All News' :
           language === 'tw' ? 'Hwɛ Nsɛm Nyinaa' :
           language === 'ee' ? 'Hwɛ Nyawo Nyui' :
           language === 'ga' ? 'Hwɛ Nsɛm Nyinaa' :
           language === 'da' ? 'Hwɛ Nsɛm Nyinaa' : 'View All News';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getTitle()}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getDescription()}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.key as any)}
              className="gap-2"
            >
              {getCategoryIcon(category.key)}
              {category.label}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${getCategoryColor(item.category)} text-white`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.category.toUpperCase()}
                  </Badge>
                </div>
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {item.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ExternalLink className="h-3 w-3" />
                  {getReadMoreText()}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="gap-2">
            <Newspaper className="h-4 w-4" />
            {getViewAllText()}
          </Button>
        </div>
      </div>
    </section>
  );
}; 