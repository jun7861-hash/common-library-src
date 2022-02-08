import React, { useState, useEffect } from 'react'
import * as types from './types'
import classname from 'classnames'
import { Input } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../common/error-message'
import { toHalfWidth } from '../../utils/toHalfWidthConverter'
import { TextCounter } from '../common/text-counter'
import { validator } from '../../utils/validator/validate.generic'
import { ErrorStatusType } from '../../utils/validator/types'
import { HintText } from '../common/hint-text'
import { RequiredSign } from '../common/required-indication'
import {
  allowNegativeDecimal,
  negativeNumber,
  numberOnly,
  allowDecimal,
  addComma,
  removeComma,
  allNumbers
} from '../../utils/regex'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const NumberInput: React.FC<types.InputNumberType> = ({
  isRequired,
  isDecimal,
  innerProps,
  texts,
  value,
  onChange,
  decimalPlace,
  inputClassName,
  inputInlineStyle,
  wrapperClassName,
  wrapperInlineStyle,
  invalid,
  innerRef,
  min,
  max,
  isCounter,
  isInputGroup,
  isRequiredMark,
  isFormat
}) => {
  const languageDetector = useTranslation()
  const [stateValue, setStateValue] = useState(value)
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  let minValue = min !== undefined ? min : 1
  let maxValue = max !== undefined ? max : 9999999999999998

  const onChangeHandler = (value: any) => {
    onChange(value)
    const inputValue = value.target.value
    const regExp = regularExpression()
    if (inputValue.match(regExp)) {
      setStateValue(inputValue)
    }
  }

  const regularExpression = () => {
    let regExp: any
    if (minValue < 0 || maxValue < 0) {
      if (isDecimal) {
        regExp = allowNegativeDecimal
      } else {
        regExp = negativeNumber
      }
    } else {
      if (isDecimal) {
        regExp = allowDecimal
      } else {
        regExp = numberOnly
      }
    }
    return regExp
  }

  const convertDecimal = (value: any) => {
    if (value === '' || value === '.' || value === '-' || value === '-.') {
      setStateValue('')
    } else {
      const addDecimal = (Math.round(value * 100) / 100).toFixed(
        decimalPlace || 2
      )
      setStateValue(
        isFormat || isFormat === undefined
          ? commaSeparator(addDecimal)
          : addDecimal
      )
    }
  }

  const commaSeparator = (value: any) => {
    return value.replace(addComma, ',')
  }

  const removeAllComa = (value: any) => {
    setStateValue(value.replace(removeComma, ''))
  }

  const handleBlur = () => {
    const convertedText = toHalfWidth(stateValue)
    const regExp = regularExpression()
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_format', {
            field: texts?.field
          })
      }
    } else if (!convertedText.match(allNumbers)) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_format', {
            field: texts?.field
          })
      }
    } else {
      if (convertedText.match(regExp)) {
        setStateValue(convertedText)
        result = validator({
          type: 'integerDecimal',
          data: convertedText,
          isRequired: isRequired || false,
          error: texts?.validate,
          max: maxValue,
          min: minValue,
          field: texts?.field
        })
      }
    }
    setError(result)

    if (isDecimal) {
      convertDecimal(convertedText)
    } else {
      setStateValue(
        isFormat || isFormat === undefined
          ? commaSeparator(convertedText)
          : convertedText
      )
    }
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_format', {
            field: texts?.field
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
    isRequired,
    isDecimal,
    innerProps,
    texts,
    value,
    onChange,
    decimalPlace,
    inputClassName,
    inputInlineStyle,
    wrapperClassName,
    wrapperInlineStyle,
    invalid,
    innerRef,
    min,
    max,
    isCounter,
    isInputGroup,
    isRequiredMark,
    isFormat
  ])

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const inputNumberClassName = classname(inputClassName, 'numberInputClass')

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
            i18n.t('placeholder_number', {
              field: texts?.field || i18n.t('default_fieldName')
            })
          }
          required={isRequired}
          onChange={(value: any) => onChangeHandler(value)}
          onClick={(value: any) => removeAllComa(value.target.value)}
          onBlur={handleBlur}
          invalid={
            invalid || (error !== undefined && error.error_message !== null)
          }
          className={inputNumberClassName}
          innerRef={innerRef}
          style={inputInlineStyle}
        />
        {texts?.hint && <HintText text={texts.hint} />}
        {isCounter && <TextCounter value={stateValue} />}
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    </React.Fragment>
  )
}
