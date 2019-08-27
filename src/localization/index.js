import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruTranslation from '../locales/ru/translation.json';
import enTranslation from '../locales/en/translation.json';

const resources = {
  ru: {
    translation: ruTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const localize = cb => i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    resources,
  })
  .then(cb);

export default localize;
