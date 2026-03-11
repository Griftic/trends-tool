import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    title: 'Emerging Trends',
    subtitle: 'Discover explosive growth topics before they peak.',
    searchPlaceholder: 'Search trends, keywords, or industries...',
    statusLabel: 'Growth Status:',
    industryLabel: 'Industry:',
    all: 'All',
    exploding: 'Exploding',
    growing: 'Growing',
    stable: 'Stable',
    declining: 'Declining',
    'new-emerging': 'New Emerging (<1k to >10k)',
    noTrends: 'No trends found matching your criteria.',
    searchVolume: 'Search Volume',
    growth: 'Growth (5yr)',
    interestOverTime: 'Interest Over Time',
    googleTrendsLive: 'Live Google Trends Data',
    footer: 'Data is mocked for demonstration purposes • v2 Upgrade with Recharts',
    categories: {
      technology: 'Technology',
      health: 'Health',
      'consumer goods': 'Consumer Goods',
      food: 'Food',
      fashion: 'Fashion',
      business: 'Business',
      finance: 'Finance',
      social: 'Social'
    }
  },
  fr: {
    title: 'Tendances Émergentes',
    subtitle: 'Découvrez les sujets en croissance explosive avant qu\'ils ne culminent.',
    searchPlaceholder: 'Rechercher des tendances, mots-clés, industries...',
    statusLabel: 'Statut de Croissance :',
    industryLabel: 'Industrie :',
    all: 'Tous',
    exploding: 'Explosif',
    growing: 'En croissance',
    stable: 'Stable',
    declining: 'En déclin',
    'new-emerging': 'Nouvelles Percées (<1k à >10k)',
    noTrends: 'Aucune tendance ne correspond à vos critères.',
    searchVolume: 'Volume de Recherche',
    growth: 'Croissance (5ans)',
    interestOverTime: 'Évolution de l\'Intérêt',
    googleTrendsLive: 'Données Google Trends en direct',
    footer: 'Données simulées pour la démonstration • Avec ajout de Recharts et Google Trends',
    categories: {
      technology: 'Technologie',
      health: 'Santé',
      'consumer goods': 'Biens de Conso.',
      food: 'Alimentation',
      fashion: 'Mode',
      business: 'Business',
      finance: 'Finance',
      social: 'Social'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr'); // FR par défaut

  const t = (key) => translations[lang][key] || key;
  const tCat = (cat) => {
    const key = cat.toLowerCase();
    return translations[lang].categories[key] || cat;
  };
  
  const toggleLanguage = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tCat, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
