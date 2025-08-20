import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronDown } from 'lucide-react';

const locations = [
  { code: 'accra', name: 'Accra', region: 'Greater Accra' },
  { code: 'kumasi', name: 'Kumasi', region: 'Ashanti' },
  { code: 'tamale', name: 'Tamale', region: 'Northern' },
  { code: 'takoradi', name: 'Takoradi', region: 'Western' },
  { code: 'cape-coast', name: 'Cape Coast', region: 'Central' },
  { code: 'ho', name: 'Ho', region: 'Volta' },
  { code: 'sunyani', name: 'Sunyani', region: 'Bono' },
  { code: 'bolgatanga', name: 'Bolgatanga', region: 'Upper East' },
];

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  selectedLocation: string;
  language: string;
}

export const LocationSelector = ({ onLocationSelect, selectedLocation, language }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedLocationName = () => {
    const location = locations.find(loc => loc.code === selectedLocation);
    return location ? location.name : 'Accra';
  };

  const getSelectedLocationRegion = () => {
    const location = locations.find(loc => loc.code === selectedLocation);
    return location ? location.region : 'Greater Accra';
  };

  return (
    <Card className="p-4 bg-gradient-earth border-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Select Location' :
           language === 'tw' ? 'Paw Beaeɛ' :
           language === 'ee' ? 'Tia Nɔƒe' :
           language === 'ga' ? 'Paw Beaeɛ' :
           language === 'da' ? 'Paw Beaeɛ' :
           language === 'fa' ? 'Paw Beaeɛ' : 'Select Location'}
        </h3>
        <Badge variant="outline" className="text-xs">
          {language === 'en' ? 'For accurate data' :
           language === 'tw' ? 'Ma nsɛm pa' :
           language === 'ee' ? 'Na nyawo pa' :
           language === 'ga' ? 'Ma nsɛm pa' :
           language === 'da' ? 'Ma nsɛm pa' :
           language === 'fa' ? 'Ma nsɛm pa' : 'For accurate data'}
        </Badge>
      </div>

      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{getSelectedLocationName()}</div>
              <div className="text-sm text-muted-foreground">{getSelectedLocationRegion()}</div>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <Button
                key={location.code}
                variant="ghost"
                className="w-full justify-start rounded-none border-b last:border-b-0"
                onClick={() => {
                  onLocationSelect(location.code);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.region}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}; 