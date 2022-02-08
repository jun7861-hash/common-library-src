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
import { emojiCount } from '../../utils/emojiCounter'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const TextField: React.FC<types.TextFieldType> = ({
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
    const inputValue = e.target.value
    const checkLength = emojiCount(inputValue.replace(noSpaceAtBeginning, ''))
      .length
    if (checkLength <= (maxLength || 100)) {
      setStateValue(inputValue.replace(noSpaceAtBeginning, ''))
      onChange(e)
    }
  }

  const handleBlur = () => {
    let result: any
    const fixedValue = stateValue
      .replace(noSpaceAtBeginningAndLast, '')
      .replace(fixDoubleSpacing, ' ')
      .replace(fixSpacing, '\n')

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidTextField', {
            field: texts?.field || i18n.t('default_fieldName')
          })
      }
    } else {
      result = validator({
        type: 'textfield',
        data: fixedValue,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 0,
        maxLength: maxLength || 100,
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
          i18n.t('error_messages_invalidTextField', {
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
    isInputGroup
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const textFieldClassName = classname(inputClassName, 'textFieldClass')

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      <Input
        value={stateValue}
        required={isRequired}
        innerRef={innerRef}
        placeholder={
          texts?.placeholder ||
          i18n.t('placeholder_textField', {
            field: texts?.field || i18n.t('default_fieldName')
          })
        }
        minLength={minLength || 0}
        {...innerProps}
        onChange={(e: any) => handleChange(e)}
        onBlur={handleBlur}
        invalid={invalid || error.status !== true}
        style={inputInlineStyle}
        className={textFieldClassName}
      />
      {texts?.hint && <HintText text={texts.hint} />}
      {isCounter && <TextCounter value={stateValue} max={maxLength || 100} />}
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
