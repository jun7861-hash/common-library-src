import React, { useState, useEffect } from 'react'
import * as types from './types'
import classname from 'classnames'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessage } from '../common/error-message'
import { useTranslation } from 'react-i18next'
import { validator } from '../../utils/validator/validate.generic'
import { ErrorStatusType } from '../../utils/validator/types'
import { RequiredSign } from '../common/required-indication'
import { TextCounter } from '../common/text-counter'
import { noSpaceAtBeginning } from '../../utils/regex'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import './index.scss'

export const SearchInput: React.FC<types.SearchType> = ({
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
  minLength,
  maxLength,
  options,
  type,
  isInputGroup,
  isRequiredMark,
  isCounter
}) => {
  const languageDetector = useTranslation()
  const [textVal, setTextVal] = useState(value)
  const [inputText, setInputText] = useState('')
  const maxInputLength = maxLength || 100

  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const handleChange = (searchValue: any) => {
    onChange(searchValue)
    setTextVal(searchValue)
  }

  const handleBlur = () => {
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_format', {
            field: texts?.field || i18n.t('default_search')
          })
      }
    } else {
      result = validator({
        type: 'search',
        data: textVal,
        isRequired: isRequired || false,
        error: texts?.validate,
        minLength: minLength || 0,
        field: texts?.field
      })
    }
    setError(result)
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_format', {
            field: texts?.field || i18n.t('default_search')
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
    setTextVal(value)
  }, [invalid, languageDetector.i18n.language, value, options])

  const customStyle = {
    control: (base: any) => ({
      ...base,
      ...inputInlineStyle,
      boxShadow: 'none !important',
      paddingLeft: 10
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingLeft: 20,
      '&::before': {
        fontFamily: "'Font Awesome 5 Free'",
        content: "'\f002'",
        position: 'absolute',
        left: 0,
        top: '6px',
        fontWeight: '900',
        color: '#b7b3b3'
      }
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999
    })
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const searchClassName = classname(
    inputClassName,
    'searchClass',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': textVal
    }
  )

  const onInputChange = (inputValue: any) => {
    const convertText = inputValue.replace(noSpaceAtBeginning, '')
    if (convertText.length <= maxInputLength) {
      setInputText(convertText)
      return convertText
    } else {
      const maxLengthInput = convertText.slice(0, maxInputLength)
      setInputText(maxLengthInput)
      return maxLengthInput
    }
  }

  return (
    <React.Fragment>
      <div style={wrapperInlineStyle} className={containerClassName}>
        {isRequiredMark && <RequiredSign />}
        <CreatableSelect
          {...innerProps}
          isMulti={type === 'multi' ? true : false}
          isRequired={isRequired}
          options={options}
          defaultValue={value}
          value={textVal}
          className={searchClassName}
          onChange={(selected: any) => handleChange(selected)}
          onInputChange={(inputValue) => onInputChange(inputValue)}
          onBlur={handleBlur}
          isClearable
          placeholder={
            texts?.placeholder ||
            i18n.t('placeholder_search', {
              field: texts?.field || i18n.t('default_search')
            })
          }
          classNamePrefix={'cp-search'}
          required={isRequired}
          ref={innerRef}
          styles={customStyle}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          formatCreateLabel={(inputValue) => `${inputValue}`}
          noOptionsMessage={() => null}
          openMenuOnClick={false}
        />
        {isCounter && <TextCounter value={inputText} max={maxInputLength} />}
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    </React.Fragment>
  )
}
