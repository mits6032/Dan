import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import tr from './locales/tr';
import { store, persistor } from '../store';

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr,
  ar
};


//I18n.defaultLocale = "ar-US";
//I18n.locale = "ar-Us";
//I18n.currentLocale();

export default I18n;
