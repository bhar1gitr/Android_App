import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Add new languages here as you get the translation files
import en from '../constants/language';
import mr from '../constants/language';
import hi from '../constants/language';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mr: { translation: mr },
    hi: { translation: hi },
  },
  lng: 'mr', 
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});