import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import ReactDatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import classname from 'classnames'
import * as types from '../types'
import { RequiredSign } from '../../common/required-indication'
import { ErrorMessage } from '../../common/error-message'
import { HintText } from '../../common/hint-text'
import { ErrorStatusType } from '../../../utils/validator/types'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import { validator } from '../../../utils/validator/validate.generic'
import { i18n, getLocaleClass } from '../../common/locale/localeIndex'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.scss'

export const DatePicker: React.FC<types.DatePickerType> = ({
  selected,
  dateFormat,
  texts,
  innerProps,
  innerRef,
  wrapperClassName,
  wrapperInlineStyle,
  inputClassName,
  inputInlineStyle,
  isRequired,
  isRequiredMark,
  isInputGroup,
  customInput,
  onChange,
  onSelect,
  readOnly,
  invalid,
  locale
}) => {
  const languageDetector = useTranslation()
  const [dateState, setDateState] = useState<any>(selected || new Date())
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const mainRef: any = useRef(innerRef || null)
  const handleChange = (date: any) => {
    setDateState(date)
    onChange(date)
    validateDate(mainRef.current.input.value || date)
  }

  const handleChangeRaw = (value: any) => {
    const inputValue = value.target.value
    const fixSpaces = toHalfWidth(inputValue)
    const fixedDate: any = moment(fixSpaces, dateFormat || 'DD-MM-YYYY', true)
    if (fixedDate._isValid) setDateState(fixedDate._d)
    else {
      setDateState(null)
    }
  }

  const validateDate = (e) => {
    let result: any
    const tobeChecked = e
    const fixedSpaces = tobeChecked !== null ? toHalfWidth(tobeChecked) : ''
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidDate', {
            field: texts?.field || i18n.t('default_date')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-date',
        data: dateState || fixedSpaces,
        error: texts?.validate,
        format: dateFormat || 'DD-MM-YYYY',
        locale: locale,
        field: texts?.field
      })
    } else {
      result = validator({
        type: 'date',
        data: dateState || fixedSpaces,
        error: texts?.validate,
        format: dateFormat || 'DD-MM-YYYY',
        locale: locale,
        field: texts?.field
      })
    }
    setError(result)
  }

  const handleBlur = (e: any) => {
    validateDate(e.target.value)
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const datePickerClassName = classname(
    inputClassName,
    'form-control',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': dateState && !isRequired
    }
  )

  const PopperContainer = (props) => {
    const el = document.body
    return ReactDOM.createPortal(props.children, el)
  }

  const DisabledInput = React.forwardRef((props: any, ref: any) => (
    <input
      {...props}
      required={isRequired}
      ref={ref}
      readOnly
      value={props.value}
    />
  ))

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidDate', {
            field: texts?.field || i18n.t('default_date')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && validateDate(dateState)
    setDateState(selected)
  }, [
    invalid,
    languageDetector.i18n.language,
    selected,
    dateFormat,
    locale,
    readOnly,
    texts,
    innerProps,
    innerRef,
    wrapperClassName,
    wrapperInlineStyle,
    inputClassName,
    inputInlineStyle,
    isRequired,
    isRequiredMark,
    isInputGroup,
    customInput,
    onChange,
    onSelect,
    readOnly
  ])

  if (dateFormat === 'YYYY-MM-DD' || dateFormat === 'YYYY/MM/DD')
    return (
      <div style={wrapperInlineStyle} className={containerClassName}>
        <div className='datePickerClass'>
          {isRequiredMark && <RequiredSign />}
          <ReactDatePicker
            selected={dateState}
            dateFormat={
              dateFormat === 'YYYY/MM/DD' ? 'yyyy/MM/dd' : 'yyyy-MM-dd'
            }
            placeholderText={
              texts?.placeholder ||
              i18n.t(`placeholder_datePicker`, {
                field: texts?.field || i18n.t('default_date')
              })
            }
            required={isRequired}
            customInput={
              customInput || (readOnly === false && readOnly !== undefined) ? (
                <input style={inputInlineStyle} {...innerProps} />
              ) : readOnly === true ? (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              ) : (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              )
            }
            onChangeRaw={(e: any) => handleChangeRaw(e)}
            onSelect={onSelect}
            onChange={handleChange}
            strictParsing
            onBlur={handleBlur}
            showMonthDropdown
            showYearDropdown
            isClearable={!isRequired}
            className={datePickerClassName}
            {...innerProps}
            popperContainer={PopperContainer}
            ref={mainRef}
            shouldCloseOnSelect
            adjustDateOnChange={false}
            locale={locale}
          />
        </div>
        <HintText text={dateFormat} />
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    )
  if (dateFormat === 'MM-DD-YYYY' || dateFormat === 'MM/DD/YYYY')
    return (
      <div style={wrapperInlineStyle} className={containerClassName}>
        <div className='datePickerClass'>
          {isRequiredMark && <RequiredSign />}
          <ReactDatePicker
            selected={dateState}
            dateFormat={
              dateFormat === 'MM/DD/YYYY' ? 'MM/dd/yyyy' : 'MM-dd-yyyy'
            }
            shouldCloseOnSelect
            placeholderText={
              texts?.placeholder ||
              i18n.t(`placeholder_datePicker`, {
                field: texts?.field || i18n.t('default_date')
              })
            }
            required={isRequired}
            customInput={
              customInput || (readOnly === false && readOnly !== undefined) ? (
                <input
                  style={inputInlineStyle}
                  {...innerProps}
                  onChange={() => {}}
                />
              ) : readOnly === true ? (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              ) : (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              )
            }
            onChange={handleChange}
            onChangeRaw={(e: any) => handleChangeRaw(e)}
            onBlur={handleBlur}
            onSelect={onSelect}
            showMonthDropdown
            showYearDropdown
            popperContainer={PopperContainer}
            isClearable={!isRequired}
            strictParsing
            className={datePickerClassName}
            {...innerProps}
            ref={mainRef}
            adjustDateOnChange={false}
            locale={locale}
          />
        </div>
        <HintText text={dateFormat} />
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    )
  if (dateFormat === 'DD-MMM-YYYY' || dateFormat === 'DD/MMM/YYYY')
    return (
      <div style={wrapperInlineStyle} className={containerClassName}>
        <div className='datePickerClass'>
          {isRequiredMark && <RequiredSign />}
          <ReactDatePicker
            selected={dateState}
            dateFormat={
              dateFormat === 'DD/MMM/YYYY' ? 'dd/MMM/yyyy' : 'dd-MMM-yyyy'
            }
            shouldCloseOnSelect
            placeholderText={
              texts?.placeholder ||
              i18n.t(`placeholder_datePicker`, {
                field: texts?.field || i18n.t('default_date')
              })
            }
            required={isRequired}
            customInput={
              customInput || (readOnly === false && readOnly !== undefined) ? (
                <input
                  style={inputInlineStyle}
                  {...innerProps}
                  onChange={() => {}}
                />
              ) : readOnly === true ? (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              ) : (
                <DisabledInput style={inputInlineStyle} {...innerProps} />
              )
            }
            onChange={handleChange}
            onChangeRaw={(e: any) => handleChangeRaw(e)}
            onBlur={handleBlur}
            onSelect={onSelect}
            showMonthDropdown
            showYearDropdown
            popperContainer={PopperContainer}
            isClearable={!isRequired}
            strictParsing
            className={datePickerClassName}
            {...innerProps}
            ref={mainRef}
            adjustDateOnChange={false}
            locale={locale}
          />
        </div>
        <HintText text={dateFormat} />
        {error && <ErrorMessage error={error.error_message} />}
      </div>
    )
  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      <div className='datePickerClass'>
        {isRequiredMark && <RequiredSign />}
        <ReactDatePicker
          selected={dateState}
          dateFormat={dateFormat === 'DD/MM/YYYY' ? 'dd/MM/yyyy' : 'dd-MM-yyyy'}
          placeholderText={
            texts?.placeholder ||
            i18n.t(`placeholder_datePicker`, {
              field: texts?.field || i18n.t('default_date')
            })
          }
          required={isRequired}
          shouldCloseOnSelect
          customInput={
            customInput || (readOnly === false && readOnly !== undefined) ? (
              <input style={inputInlineStyle} {...innerProps} />
            ) : readOnly === true ? (
              <DisabledInput style={inputInlineStyle} {...innerProps} />
            ) : (
              <DisabledInput style={inputInlineStyle} {...innerProps} />
            )
          }
          onChange={handleChange}
          onChangeRaw={(e: any) => handleChangeRaw(e)}
          popperContainer={PopperContainer}
          onBlur={(e: any) => handleBlur(e)}
          onSelect={onSelect}
          showMonthDropdown
          showYearDropdown
          strictParsing
          isClearable={!isRequired}
          className={datePickerClassName}
          {...innerProps}
          ref={mainRef}
          adjustDateOnChange={false}
          locale={locale}
        />
      </div>
      <HintText text={dateFormat || 'DD-MM-YYYY'} />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
