import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input } from 'reactstrap'
import { ErrorMessage } from '../common/error-message'
import { RequiredSign } from '../common/required-indication'
import * as types from './types'
import { HintText } from '../common/hint-text'
import { TextCounter } from '../common/text-counter'
import { toHalfWidth } from '../../utils/toHalfWidthConverter'
import { digitsAndSpecialChars } from '../../utils/regex'
import { ErrorStatusType } from '../../utils/validator/types'
import { validator } from '../../utils/validator/validate.generic'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const PhoneInput: React.FC<types.PhoneInputType> = ({
  value,
  onChange,
  texts,
  innerRef,
  innerProps,
  wrapperClassName,
  inputClassName,
  wrapperInlineStyle,
  inputInlineStyle,
  isRequired,
  isCounter,
  invalid,
  maxLength,
  minLength,
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

  const handleBlur = () => {
    let result: any
    const fixedValue = toHalfWidth(stateValue)

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidPhoneNumber', {
            field: texts?.field || i18n.t('default_fieldName')
          })
      }
    } else {
      result = validator({
        type: 'phone',
        data: fixedValue,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 3,
        field: texts?.field
      })
    }
    setError(result)
    setStateValue(fixedValue)
  }

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    const fixedValue = toHalfWidth(inputValue)
    if (fixedValue.match(digitsAndSpecialChars)) {
      setStateValue(inputValue)
      onChange(e)
    }
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidPhoneNumber', {
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
    error.error_message && handleBlur()
    setStateValue(value)
  }, [
    invalid,
    languageDetector.i18n.language,
    value,
    onChange,
    texts,
    innerRef,
    innerProps,
    wrapperClassName,
    inputClassName,
    wrapperInlineStyle,
    inputInlineStyle,
    isRequired,
    isCounter,
    invalid,
    maxLength,
    minLength,
    isRequiredMark,
    isInputGroup
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && `isInputGroupClass`,
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const phoneInputClassName = classname(inputClassName, 'phoneInputClass')

  return (
    <div className={containerClassName} style={wrapperInlineStyle}>
      {isRequiredMark && <RequiredSign />}
      <Input
        value={stateValue}
        required={isRequired}
        innerRef={innerRef}
        placeholder={
          texts?.placeholder ||
          i18n.t('placeholder_phoneInput', {
            field: texts?.field || i18n.t('default_fieldName')
          })
        }
        maxLength={maxLength || 25}
        minLength={minLength || 3}
        {...innerProps}
        onBlur={handleBlur}
        onChange={(e: any) => handleChange(e)}
        invalid={invalid || error.status !== true}
        style={inputInlineStyle}
        className={phoneInputClassName}
      />
      <HintText text={i18n.t('hintText_phoneInput')} />
      {isCounter && <TextCounter value={stateValue} max={maxLength || 25} />}
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
