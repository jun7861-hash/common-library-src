import lang_EN from '../../../utils/locales/en/translation.json'
import lang_JP from '../../../utils/locales/jp/translation.json'
import lang_CH from '../../../utils/locales/ch/translation.json'

let _lang = lang_EN

const ChangeLanguage = (lang) => {
  switch (lang) {
    case 'ja_JP':
      _lang = lang_JP
      break
    case 'zh_TW':
      _lang = lang_CH
      break
    case 'en_US':
      _lang = lang_EN
      break
    default:
      _lang = lang_EN
  }
}

const t = (path, options?) => {
  const array = path.split('.')
  let current = _lang
  let result = ''
  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i]
    var value = current[property]
    if (i === j - 1) {
      result = FormatLocale(value, options)
    } else {
      result = ''
    }
    current = value
  }
  return result
}

const FormatLocale = (string: string, ...args: any) => {
  const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0]
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return string?.replace(RE_NARGS, (match, _prefix, i, index) => {
    let result

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i
    } else {
      result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}

export default { t, ChangeLanguage }
