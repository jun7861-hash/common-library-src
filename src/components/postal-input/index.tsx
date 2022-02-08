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
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const PostalInput: React.FC<types.PostalInputType> = ({
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
  minLength,
  maxLength,
  invalid,
  isRequiredMark,
  isHalfWidth = true,
  isInputGroup
}) => {
  const languageDetector = useTranslation()
  const [stateValue, setStateValue] = useState(value)
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const handleChange = (e: any) => {
    const inputValue = e.target.value.toUpperCase()
    setStateValue(inputValue.replace(noSpaceAtBeginning, '').toUpperCase())
    onChange(e)
  }

  const handleBlur = () => {
    let result: any
    const fixedValue = isHalfWidth
      ? toHalfWidth(stateValue)
      : stateValue
          .replace(noSpaceAtBeginningAndLast, '')
          .replace(fixDoubleSpacing, ' ')
          .replace(fixSpacing, '\n')

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidPostal', {
            field: texts?.field || i18n.t('default_fieldName')
          })
      }
    } else {
      result = validator({
        type: 'postal',
        data: fixedValue,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 3,
        field: texts?.field
      })
    }
    setError(result)
    setStateValue(
      !isHalfWidth
        ? fixedValue
        : toHalfWidth(fixedValue)
    )
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidPostal', {
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
    minLength,
    maxLength,
    invalid,
    isRequiredMark,
    isHalfWidth,
    isInputGroup
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const postalInputClassName = classname(inputClassName, 'postalInputClass')

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      <Input
        value={stateValue}
        required={isRequired}
        innerRef={innerRef}
        placeholder={
          texts?.placeholder ||
          i18n.t('placeholder_postalInput', {
            field: texts?.field || i18n.t('default_fieldName')
          })
        }
        maxLength={maxLength || 10}
        minLength={minLength || 3}
        {...innerProps}
        onChange={(e: any) => handleChange(e)}
        onBlur={handleBlur}
        invalid={invalid || error.status !== true}
        style={inputInlineStyle}
        className={postalInputClassName}
      />
      <HintText text={i18n.t('hintText_postalInput')} />
      {isCounter && <TextCounter value={stateValue} max={maxLength || 10} />}
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
