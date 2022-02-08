import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input } from 'reactstrap'
import * as types from './types'
import { TextCounter } from '../common/text-counter'
import { RequiredSign } from '../common/required-indication'
import { ErrorMessage } from '../common/error-message'
import { HintText } from '../common/hint-text'
import {
  noSpaceAtBeginning,
  noSpaceAtBeginningAndLast,
  fixDoubleSpacing,
  fixSpacing
} from '../../utils/regex'
import { ErrorStatusType } from '../../utils/validator/types'
import { validator } from '../../utils/validator/validate.generic'
import { toHalfWidth } from '../../utils/toHalfWidthConverter'
import 'bootstrap/dist/css/bootstrap.min.css'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import './index.scss'

export const URLInput: React.FC<types.URLInputType> = ({
  value,
  texts,
  innerRef,
  onChange,
  innerProps,
  wrapperClassName,
  inputClassName,
  wrapperInlineStyle,
  inputInlineStyle,
  isRequired,
  isCounter,
  maxLength,
  minLength,
  invalid,
  isRequiredMark,
  isHalfWidth,
  isInputGroup,
  acceptType
}) => {
  const languageDetector = useTranslation()
  const [stateValue, setStateValue] = useState(value)
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setStateValue(inputValue.replace(noSpaceAtBeginning, ''))
    onChange(e)
  }

  const hintType = acceptType?.map((type: any) => {
    const text =
      type === 'mailto' || type === 'news'
        ? ':example.com'
        : type === 'wais'
        ? '://100.64.0.0:5'
        : '://example.com'
    return type + text
  })

  const handleBlur = () => {
    let result: any
    const fixedValue = !isHalfWidth
      ? stateValue
      : toHalfWidth(stateValue)
          .replace(noSpaceAtBeginningAndLast, '')
          .replace(fixDoubleSpacing, ' ')
          .replace(fixSpacing, '\n')

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidURL', {
            field: texts?.field || i18n.t('default_URL')
          })
      }
    } else {
      result = validator({
        type: 'url',
        data: fixedValue,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 0,
        acceptType: acceptType,
        field: texts?.field
      })
    }
    setError(result)
    setStateValue(!isHalfWidth ? fixedValue : toHalfWidth(fixedValue))
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidURL', {
            field: texts?.field || i18n.t('default_URL')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && handleBlur()
    setStateValue(value)
  }, [
    invalid,
    languageDetector.i18n.language,
    value,
    texts,
    innerRef,
    innerProps,
    wrapperClassName,
    inputClassName,
    wrapperInlineStyle,
    inputInlineStyle,
    isRequired,
    isCounter,
    maxLength,
    minLength,
    invalid,
    isRequiredMark,
    isHalfWidth,
    isInputGroup,
    acceptType
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const urlInputClassName = classname(inputClassName, 'urlInputClass')

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      <Input
        value={stateValue}
        required={isRequired}
        innerRef={innerRef}
        placeholder={
          texts?.placeholder ||
          i18n.t('placeholder_urlInput', {
            field: texts?.field || i18n.t('default_URL')
          })
        }
        maxLength={maxLength || 2000}
        minLength={minLength || 0}
        {...innerProps}
        onChange={(e: any) => handleChange(e)}
        onBlur={handleBlur}
        invalid={invalid || error.status !== true}
        style={inputInlineStyle}
        className={urlInputClassName}
      />
      <HintText
        text={
          acceptType ? hintType.join(' or ') : i18n.t('hintText_urlHTTPorHTTPS')
        }
      />
      {isCounter && <TextCounter value={stateValue} max={maxLength || 2000} />}
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
