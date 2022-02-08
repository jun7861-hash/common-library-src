import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import { useTranslation } from 'react-i18next'
import { Input } from 'reactstrap'
import { ErrorMessage } from '../common/error-message'
import { RequiredSign } from '../common/required-indication'
import { TextCounter } from '../common/text-counter'
import { HintText } from '../common/hint-text'
import * as types from './types'
import { toHalfWidth } from '../../utils/toHalfWidthConverter'
import { validator } from '../../utils/validator/validate.generic'
import { ErrorStatusType } from '../../utils/validator/types'
import {
  noSpaceAtBeginning,
  noSpaceAtBeginningAndLast,
  fixDoubleSpacing,
  fixSpacing
} from '../../utils/regex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const EmailInput: React.FC<types.EmailInputType> = ({
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
  invalid,
  isRequiredMark,
  isInputGroup,
  minLength,
  maxLength
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

  const handleBlur = () => {
    let result: any

    const fixedValue = toHalfWidth(
      stateValue
        .replace(noSpaceAtBeginningAndLast, '')
        .replace(fixDoubleSpacing, ' ')
        .replace(fixSpacing, '\n')
    )

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidEmail', {
            field: texts?.field || 'Email'
          })
      }
    } else {
      result = validator({
        type: 'email',
        data: fixedValue,
        isRequired: isRequired,
        error: texts?.validate,
        minLength: minLength || 0,
        maxLength: maxLength || 321,
        field: texts?.field
      })
    }
    setError(result)
    setStateValue(fixedValue)
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidEmail', {
            field: texts?.field || 'Email'
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
    onChange,
    innerProps,
    wrapperClassName,
    inputClassName,
    wrapperInlineStyle,
    inputInlineStyle,
    isRequired,
    isCounter,
    invalid,
    isRequiredMark,
    isInputGroup,
    minLength,
    maxLength
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const emailInputClassName = classname(inputClassName, 'emailInputClass')

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      <Input
        value={stateValue}
        required={isRequired}
        innerRef={innerRef}
        placeholder={
          texts?.placeholder ||
          i18n.t('placeholder_emailInput', {
            field: texts?.field || i18n.t('default_fieldName')
          })
        }
        maxLength={maxLength || 320}
        minLength={minLength || 5}
        {...innerProps}
        onChange={(e: any) => handleChange(e)}
        onBlur={handleBlur}
        invalid={invalid || error.status !== true}
        style={inputInlineStyle}
        className={emailInputClassName}
      />
      <HintText text='simple@example.com' />
      {isCounter && <TextCounter value={stateValue} max={320} />}
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
