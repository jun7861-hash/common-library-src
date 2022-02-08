export { default as i18n } from './localeComponents'

export const getLocaleClass = (locale: any) => {
  switch (locale) {
    case 'zh':
    case 'ch':
    case 'zh_TW':
    case 'zh-TW':
    case 'zh_CN':
    case 'zh-CN': {
      return 'cp-locale-zh'
    }
    case 'ja':
    case 'jp':
    case 'ja-JP':
    case 'ja_JP': {
      return 'cp-locale-jp'
    }
    case 'en':
    case 'en_US':
    case 'en-US': {
      return 'cp-locale-en'
    }
    default:
      return 'cp-locale-en'
  }
}
