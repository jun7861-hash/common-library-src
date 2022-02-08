import React, { useState, useEffect } from 'react'
import * as types from './types'
import { Input } from 'reactstrap'
import classname from 'classnames'
import { ErrorMessage } from '../common/error-message'
import { toHalfWidth } from '../../utils/toHalfWidthConverter'
import { TextCounter } from '../common/text-counter'
import { HintText } from '../common/hint-text'
import { alphaNumeric } from '../../utils/regex'
import { validator } from '../../utils/validator/validate.generic'
import { useTranslation } from 'react-i18next'
import { RequiredSign } from '../common/required-indication'
import { ErrorStatusType } from '../../utils/validator/types'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const CountryInput: React.FC<types.CountryCodeType> = ({
  isRequired,
  innerProps,
  texts,
  value,
  innerRef,
  invalid,
  onChange,
  inputClassName,
  wrapperClassName,
  inputInlineStyle,
  wrapperInlineStyle,
  maxLength,
  minLength,
  isCounter,
  isRequiredMark,
  isInputGroup
}) => {
  const languageDetector = useTranslation()
  const [stateValue, setStateValue] = useState(value)
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const handleChange = (value: any) => {
    onChange(value)
    const inputText = value.target.value
    if (inputText.length <= (maxLength || 3)) {
      const check = inputText.replace(alphaNumeric, '')
      setStateValue(check.toUpperCase())
    }
  }

  const handleBlur = (chars: any) => {
    const convertedText = toHalfWidth(chars)
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidCountryCode', {
            field: texts?.field || i18n.t('default_fieldName')
          })
      }
    } else {
      result = validator({
        type: 'country',
        data: convertedText,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 2,
        field: texts?.field
      })
    }
    setError(result)
    setStateValue(convertedText)
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidCountryCode', {
            field: texts?.field || i18n.t('default_fieldName')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && handleBlur(stateValue)
    setStateValue(value)
  }, [
    invalid,
    languageDetector.i18n.language,
    value,
    isRequired,
    innerProps,
    texts,
    innerRef,
    invalid,
    onChange,
    inputClassName,
    wrapperClassName,
    inputInlineStyle,
    wrapperInlineStyle,
    maxLength,
    minLength,
    isCounter,
    isRequiredMark,
    isInputGroup
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const textFieldClassName = classname(inputClassName, 'countryCodeClass')

  return (
    <React.Fragment>
      <div style={wrapperInlineStyle} className={containerClassName}>
        {isRequiredMark && <RequiredSign />}
        <Input
          {...innerProps}
          type='text'
          value={stateValue}
          placeholder={
            texts?.placeholder ||
            i18n.t('placeholder_countryCode', {
              field: texts?.field || i18n.t('default_fieldName')
            })
          }
          required={isRequired}
          minLength={minLength || 2}
          maxLength={maxLength || 3}
          onChange={(e: any) => handleChange(e)}
          onBlur={() => handleBlur(stateValue)}
          invalid={invalid || error.status !== true}
          innerRef={innerRef}
          className={textFieldClassName}
          style={inputInlineStyle}
        />
        <HintText text={texts?.hint || i18n.t('hintText_countryCode')} />
        {isCounter && <TextCounter value={stateValue} max={maxLength || 3} />}
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    </React.Fragment>
  )
}
