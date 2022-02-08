import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '../utils/locales/en/translation.json'
import translationJP from '../utils/locales/jp/translation.json'
import translationCH from '../utils/locales/ch/translation.json'

const resources = {
  en_US: {
    translation: translationEN
  },
  ja_JP: {
    translation: translationJP
  },
  zh_TW: {
    translation: translationCH
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_US',
  fallbackLng: 'en_US',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
})

export default i18n
