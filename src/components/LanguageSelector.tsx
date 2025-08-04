import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tw', name: 'Twi', flag: '🇬🇭' },
  { code: 'ee', name: 'Ewe', flag: '🇬🇭' },
  { code: 'ga', name: 'Ga', flag: '🇬🇭' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  selectedLanguage: string;
}

export const LanguageSelector = ({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) => {
  return (
    <Card className="p-6 bg-gradient-earth border-2">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Choose Your Language / Paw wo kasa
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "ghana" : "earth"}
            className="h-auto p-4 flex flex-col items-center gap-2 text-center"
            onClick={() => onLanguageSelect(lang.code)}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};