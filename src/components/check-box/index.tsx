import React, { useState, useEffect } from 'react'
import classname from 'classnames'
import { useTranslation } from 'react-i18next'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import * as types from './types'
import { Input, FormGroup, Label } from 'reactstrap'
import { RequiredSign } from '../common/required-indication'
import { ErrorMessage } from '../common/error-message'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const Checkbox: React.FC<types.CheckBoxType> = ({
  isRequired,
  innerProps,
  texts,
  onChange,
  inputClassName,
  inputInlineStyle,
  wrapperClassName,
  wrapperInlineStyle,
  innerRef,
  options,
  direction,
  value,
  type,
  invalid
}) => {
  const languageDetector = useTranslation()
  const [checkboxValue, setCheckboxValue] = useState(value)
  const [error, setError] = useState(false)

  useEffect(() => {
    type === 'single' && isRequired && checkboxValue === ''
      ? setError(true)
      : setError(false)
  }, [
    checkboxValue,
    languageDetector.i18n.language,
    isRequired,
    innerProps,
    texts,
    onChange,
    inputClassName,
    inputInlineStyle,
    wrapperClassName,
    wrapperInlineStyle,
    innerRef,
    options,
    direction,
    value,
    type,
    invalid
  ])

  useEffect(() => {
    value === '' && setError(false)
  }, [
    languageDetector.i18n.language,
    isRequired,
    innerProps,
    texts,
    onChange,
    inputClassName,
    inputInlineStyle,
    wrapperClassName,
    wrapperInlineStyle,
    innerRef,
    options,
    direction,
    value,
    type,
    invalid
  ])

  const handleClick = (value: any) => {
    if (checkboxValue.length > 0) {
      if (type === 'single') {
        if (checkboxValue === value) {
          setCheckboxValue('')
        } else {
          setCheckboxValue(value)
        }
      } else {
        if (checkboxValue.includes(value)) {
          const removeValue = checkboxValue.filter((item: any) => {
            return value !== item
          })
          setCheckboxValue(removeValue)
        } else {
          setCheckboxValue([...checkboxValue, value])
        }
      }
    } else {
      switch (type) {
        case 'multiple':
          setCheckboxValue([...checkboxValue, value])
          break
        case 'single':
          setCheckboxValue(value)
          break
      }
    }
  }

  const containerClassName = classname(
    wrapperClassName,
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const checkBoxClassName = classname(inputClassName, 'checkBoxClass')

  return (
    <React.Fragment>
      <div style={wrapperInlineStyle} className={containerClassName}>
        {options &&
          options.map((item: any, key: any) => (
            <FormGroup
              check
              inline={direction === 'horizontal' || direction === undefined}
              key={key}
            >
              <Label>
                <Input
                  {...innerProps}
                  type='checkbox'
                  value={item.value}
                  required={isRequired}
                  onChange={(e: any) => onChange(e)}
                  className={checkBoxClassName}
                  style={inputInlineStyle}
                  innerRef={innerRef}
                  checked={
                    checkboxValue.length > 0 &&
                    checkboxValue.includes(item.value)
                      ? true
                      : false
                  }
                  onClick={(e: any) => handleClick(e.target.value)}
                  invalid={invalid}
                />{' '}
                {isRequired && type === 'single' && <RequiredSign />}
                {item.label}
              </Label>
            </FormGroup>
          ))}
        {error && (
          <ErrorMessage
            error={texts?.validate || i18n.t('error_messages_checkBox')}
          />
        )}
      </div>
    </React.Fragment>
  )
}
