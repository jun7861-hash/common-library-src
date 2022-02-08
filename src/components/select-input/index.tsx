import React, { useState, useEffect } from 'react'
import * as types from './types'
import classname from 'classnames'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessage } from '../common/error-message'
import { HintText } from '../common/hint-text'
import { useTranslation } from 'react-i18next'
import { validator } from '../../utils/validator/validate.generic'
import { ErrorStatusType } from '../../utils/validator/types'
import { RequiredSign } from '../common/required-indication'
import { TextCounter } from '../common/text-counter'
import { noSpaceAtBeginning } from '../../utils/regex'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import './index.scss'

export const SelectInput: React.FC<types.SelectInputTypes> = ({
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
  isMulti,
  isInputGroup,
  isRequiredMark,
  isCounter,
  menuIsOpen,
  getOptionValue,
  getOptionLabel,
  formatGroupLabel,
  isClearable,
  isDisabled,
  isLoading,
  isSearchable,
  maxMenuHeight,
  onKeyDown,
  onCreateOption,
  menuPlacement,
  menuPortalTarget,
  classNamePrefix,
  inputValue,
  components,
  styles,
  onInputChange,
  dataType,
  createOpt
}) => {
  const languageDetector = useTranslation()
  const [textVal, setTextVal] = useState(value)
  const [inputVal, setInputVal] = useState('')
  const maxLengthLimit = maxLength || 100

  useEffect(() => {
    if (typeof value === 'string') {
      if (value !== '') {
        const check = options.filter((item: any) => {
          return item.value.toLowerCase().includes(value)
        })
        setTextVal(check)
      }
    }
  }, [])

  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const handleChange = (selectValue: any) => {
    if (!isMulti) {
      if (dataType === 'string') {
        if (selectValue) {
          onChange(selectValue.value)
          createOpt && selectValue.__isNew__ && inputVal
            ? setTextVal({ ...selectValue, label: inputVal })
            : setTextVal(selectValue)
        } else {
          onChange('')
          setTextVal('')
        }
      } else if (dataType === 'object') {
        if (selectValue) {
          createOpt && selectValue.__isNew__ && inputVal
            ? onChange({ ...selectValue, label: inputVal })
            : onChange(selectValue)
          createOpt && selectValue.__isNew__ && inputVal
            ? setTextVal({ ...selectValue, label: inputVal })
            : setTextVal(selectValue)
        } else {
          onChange(selectValue)
          setTextVal(selectValue)
        }
      } else {
        if (selectValue) {
          createOpt && selectValue.__isNew__ && inputVal
            ? onChange([{ ...selectValue, label: inputVal }])
            : onChange([selectValue])
          createOpt && selectValue.__isNew__ && inputVal
            ? setTextVal([{ ...selectValue, label: inputVal }])
            : setTextVal(selectValue)
        } else {
          onChange(selectValue)
          setTextVal(selectValue)
        }
      }
    } else {
      onChange(selectValue)
      setTextVal(selectValue)
    }
    createOpt && inputVal && setInputVal('')
  }

  const handleBlur = () => {
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_selectInput', {
            field: texts?.field || i18n.t('default_select')
          })
      }
    } else {
      result = validator({
        type: 'select',
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
          i18n.t('error_messages_selectInput', {
            field: texts?.field || i18n.t('default_select')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    if (isMulti) {
      if (isRequired) {
        isClearable = false
      }
    }
    error.error_message && handleBlur()
    setTextVal(value)
  }, [
    invalid,
    languageDetector.i18n.language,
    value,
    options,
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
    isMulti,
    isInputGroup,
    isRequiredMark,
    isCounter,
    menuIsOpen,
    getOptionValue,
    getOptionLabel,
    formatGroupLabel,
    isClearable,
    isDisabled,
    isLoading,
    isSearchable,
    maxMenuHeight,
    onKeyDown,
    onCreateOption,
    menuPlacement,
    menuPortalTarget,
    classNamePrefix,
    inputValue,
    components,
    styles,
    onInputChange,
    dataType,
    createOpt
  ])

  useEffect(() => {
    options.sort((a: any, b: any) => {
      if (a.label < b.label) {
        return -1
      }
      if (a.label > b.label) {
        return 1
      }
      return 0
    })
  }, [options])

  const customStyle = {
    control: (base: any) => ({
      ...base,
      ...inputInlineStyle,
      boxShadow: 'none !important',
      paddingLeft: 10
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999
    }),
    ...styles
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const selectClassName = classname(
    inputClassName,
    'selectClass',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': textVal
    }
  )

  const onInpChange = (inputValue: any) => {
    const convertText = inputValue.replace(noSpaceAtBeginning, '')
    if (convertText !== ' ' || convertText) {
      if (convertText.length <= maxLengthLimit) {
        onInputChange && onInputChange(convertText)
        setInputVal(convertText)
        return convertText
      } else {
        const inputValueNew = convertText.slice(0, maxLengthLimit)
        onInputChange && onInputChange(inputValueNew)
        setInputVal(inputValueNew)
        return inputValueNew
      }
    }
  }

  return (
    <React.Fragment>
      <div style={wrapperInlineStyle} className={containerClassName}>
        {isRequiredMark && <RequiredSign />}
        {createOpt ? (
          <CreatableSelect
            {...innerProps}
            isMulti={isMulti}
            isRequired={isRequired}
            options={options}
            defaultValue={value}
            value={textVal}
            className={selectClassName}
            onChange={(selected: any) => handleChange(selected)}
            onInputChange={(inputValue: any) => onInpChange(inputValue)}
            onBlur={handleBlur}
            isClearable={isClearable || false}
            placeholder={
              texts?.placeholder ||
              i18n.t('placeholder_selectInput', {
                field: texts?.field || i18n.t('default_select')
              })
            }
            classNamePrefix={classNamePrefix || 'cp-select-input'}
            required={isRequired}
            ref={innerRef}
            styles={customStyle}
            components={components}
            menuIsOpen={menuIsOpen}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            formatGroupLabel={formatGroupLabel}
            isDisabled={isDisabled || false}
            isLoading={isLoading || false}
            isSearchable={isSearchable === false ? false : true}
            maxMenuHeight={maxMenuHeight || 400}
            onKeyDown={onKeyDown}
            onCreateOption={onCreateOption}
            menuPlacement={menuPlacement || 'auto'}
            menuPortalTarget={menuPortalTarget || document.body}
            inputValue={inputValue}
            noOptionsMessage={() => texts?.noOptionsMessage}
            formatCreateLabel={(inputValue: string) => {
              return (
                <span>
                  {isCounter && (
                    <TextCounter
                      value={inputValue}
                      max={maxLengthLimit}
                      wrapperClassName='cp-counter mr-1'
                    />
                  )}
                  Create "{inputValue}"
                </span>
              )
            }}
          />
        ) : (
          <Select
            {...innerProps}
            isMulti={isMulti}
            isRequired={isRequired}
            options={options}
            defaultValue={value}
            value={textVal}
            className={selectClassName}
            onChange={(selected: any) => handleChange(selected)}
            onInputChange={(inputValue: any) => onInpChange(inputValue)}
            onBlur={handleBlur}
            isClearable={isClearable || false}
            placeholder={
              texts?.placeholder ||
              i18n.t('placeholder_selectInput', {
                field: texts?.field || i18n.t('default_select')
              })
            }
            classNamePrefix={classNamePrefix || 'cp-select-input'}
            required={isRequired}
            ref={innerRef}
            styles={customStyle}
            components={components}
            menuIsOpen={menuIsOpen}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            formatGroupLabel={formatGroupLabel}
            isDisabled={isDisabled || false}
            isLoading={isLoading || false}
            isSearchable={isSearchable === false ? false : true}
            maxMenuHeight={maxMenuHeight || 400}
            onKeyDown={onKeyDown}
            onCreateOption={onCreateOption}
            menuPlacement={menuPlacement || 'auto'}
            menuPortalTarget={menuPortalTarget || document.body}
            inputValue={inputValue}
            noOptionsMessage={() => texts?.noOptionsMessage}
          />
        )}
        {texts?.hint && <HintText text={texts.hint} />}
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    </React.Fragment>
  )
}
