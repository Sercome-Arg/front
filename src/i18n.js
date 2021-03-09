import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import detector from "i18next-browser-languagedetector";

import translationES from './locales/es.json';
import translationEN from './locales/en.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "es",
    fallbackLng: "es", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });


export default i18n;