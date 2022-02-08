import React, { useEffect } from 'react'
import * as types from './types'
import { i18n } from './localeIndex'
import i18next from 'i18next'

export const Locale: React.FC = ({ children, locale }: types.LocaleType) => {
  useEffect(() => {
    switch (locale) {
      case 'zh':
      case 'ch':
      case 'zh_TW':
      case 'zh-TW':
      case 'zh_CN':
      case 'zh-CN': {
        i18n.ChangeLanguage('zh_TW')
        i18next.changeLanguage('zh_TW')
        break
      }
      case 'ja':
      case 'jp':
      case 'ja-JP':
      case 'ja_JP': {
        i18n.ChangeLanguage('ja_JP')
        i18next.changeLanguage('ja_JP')
        break
      }
      case 'en':
      case 'en_US':
      case 'en-US': {
        i18n.ChangeLanguage('en_US')
        i18next.changeLanguage('en_US')
        break
      }
      default:
        i18n.ChangeLanguage('en_US')
        i18next.changeLanguage('en_US')
    }
  }, [locale])

  return <React.Fragment>{children}</React.Fragment>
}
