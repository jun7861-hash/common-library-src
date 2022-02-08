import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import classname from 'classnames'
import { RequiredSign } from '../../common/required-indication'
import * as types from '../types'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage } from '../../common/error-message'
import { HintText } from '../../common/hint-text'
import { ErrorStatusType } from '../../../utils/validator/types'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import { validator } from '../../../utils/validator/validate.generic'
import '../index.scss'
import { i18n, getLocaleClass } from '../../common/locale/localeIndex'

export const DateRangePicker: React.FC<types.DateRangePickerType> = ({
  selected,
  endDate,
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
  innerEndRef,
  innerStartRef,
  invalid,
  locale
}) => {
  const languageDetector = useTranslation()
  const [startDate, setStartDateRange] = useState<any>(selected || new Date())
  const [endDateRange, setEndDate] = useState<any>(endDate || new Date())
  const [rangeDate, setRangeDate] = useState<any>({
    startDate: startDate,
    endDate: endDateRange
  })
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })
  const defaultStartRef: any = useRef(innerStartRef || null)
  const defaultEndRef: any = useRef(innerEndRef || null)

  const PopperContainer = (props: any) => {
    return ReactDOM.createPortal(props.children, document.body)
  }

  const validateRange = (range) => {
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidDateRange', {
            field: texts?.field || i18n.t('default_dateRange')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-date-range',
        data: range,
        error: texts?.validate || i18n.t('error_messages_invalidDateRange'),
        format: dateFormat || 'DD-MM-YYYY',
        locale: locale,
        field: texts?.field
      })
    } else {
      result = validator({
        type: 'date-range',
        data: range,
        error: texts?.validate || i18n.t('error_messages_invalidDateRange'),
        format: dateFormat || 'DD-MM-YYYY',
        locale: locale,
        field: texts?.field
      })
    }
    setError(result)
  }

  const handleBlur = () => {
    validateRange({
      startDate: defaultStartRef.current.input.value || rangeDate.startDate,
      endDate: defaultEndRef.current.input.value || rangeDate.endDate
    })
  }

  const clearAll = () => {
    setEndDate(null)
    setStartDateRange(null)
    setRangeDate({
      startDate: null,
      endDate: null
    })
    validateRange({
      startDate: null,
      endDate: null
    })
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const dateRangePickerClassName = classname(
    inputClassName,
    'form-control',
    'dateRangePickerClass',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': startDate && endDateRange && !isRequired
    }
  )

  const handleStartRaw = (value: any) => {
    const inputValue = value.target.value
    const fixSpaces = toHalfWidth(inputValue)
    const fixedDate: any = moment(fixSpaces, dateFormat || 'DD-MM-YYYY', true)
    if (fixedDate._isValid) {
      setStartDateRange(fixedDate._d)
      setRangeDate({
        startDate: fixedDate._d,
        endDate: rangeDate.endDate
      })
      const toBeSet: any = moment(fixedDate._d, dateFormat).add(1, 'day')
      if (endDateRange === null) {
        setEndDate(toBeSet._d)
        setRangeDate({
          startDate: fixedDate._d,
          endDate: toBeSet._d
        })
      } else {
        validateRange({
          startDate: rangeDate.startDate || defaultStartRef.current.input.value,
          endDate: rangeDate.endDate || defaultEndRef.current.input.value
        })
      }
    } else {
      setStartDateRange(null)
    }
  }

  const handleEndRaw = (value) => {
    const inputValue = value.target.value
    const fixSpaces = toHalfWidth(inputValue)
    const fixedDate: any = moment(fixSpaces, dateFormat || 'DD-MM-YYYY', true)
    if (fixedDate._isValid) {
      setEndDate(fixedDate._d)
      setRangeDate({
        endDate: fixedDate._d,
        startDate: rangeDate.startDate
      })
    } else {
      setEndDate(null)
    }
  }

  const handleStartChange = (date: any) => {
    onChange(date)
    setStartDateRange(date)
    setRangeDate({
      startDate: date,
      endDate: rangeDate.endDate
    })
    const toBeSet: any = moment(date, dateFormat).add(1, 'day')
    const toBeCheck: any = moment(date, dateFormat || 'DD-MM-YYYY', true)
    if (endDateRange === null && toBeCheck._isValid) {
      setEndDate(toBeSet._d)
      setRangeDate({
        startDate: date,
        endDate: toBeSet._d
      })
    } else {
      validateRange({
        startDate: date,
        endDate: rangeDate.endDate || defaultEndRef.current.input.value
      })
    }
  }

  const handleEndChange = (date: any) => {
    setEndDate(date)
    setRangeDate({
      startDate: rangeDate.startDate,
      endDate: date
    })
    onChange(date)
    validateRange({
      startDate: rangeDate.startDate || defaultStartRef.current.input.value,
      endDate: date
    })
  }

  const handleStartBlur = () => {
    validateRange({
      startDate: defaultStartRef.current.input.value || rangeDate.startDate,
      endDate: defaultEndRef.current.input.value || rangeDate.endDate
    })
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidDateRange', {
            field: texts?.field || i18n.t('default_dateRange')
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
    setStartDateRange(selected || new Date())
    setEndDate(endDate || new Date())
    setRangeDate({
      startDate: selected || new Date(),
      endDateRange: endDate || new Date()
    })
  }, [
    invalid,
    languageDetector.i18n.language,
    selected,
    endDate,
    dateFormat,
    locale,
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
    innerEndRef,
    innerStartRef
  ])

  const DefaultCustomInput = React.forwardRef((props: any, ref) => {
    return (
      <span
        {...props}
        style={{}}
        ref={ref}
        className='date-range-input'
        {...innerProps}
      >
        <button className='range-btn'>{props.value}</button>
      </span>
    )
  })

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      {/* act as input */}
      <div
        className={dateRangePickerClassName}
        style={inputInlineStyle}
        {...innerProps}
        ref={innerRef}
      >
        {/* act as placeholder */}
        {startDate || endDateRange ? (
          <React.Fragment />
        ) : (
          <span className='dateRangePh'>
            {texts?.placeholder ||
              i18n.t('placeholder_dateRangePicker', {
                field: texts?.field || i18n.t('default_dateRange')
              })}
          </span>
        )}
        <ReactDatePicker
          selectsStart
          strictParsing
          selected={startDate}
          onChangeRaw={handleStartRaw}
          startDate={startDate}
          {...innerProps}
          endDate={endDateRange}
          dateFormat={
            dateFormat === 'MM/DD/YYYY'
              ? 'MM/dd/yyyy'
              : dateFormat === 'DD/MM/YYYY'
              ? 'dd/MM/yyyy'
              : dateFormat === 'YYYY/MM/DD'
              ? 'yyyy/MM/dd'
              : dateFormat === 'MM-DD-YYYY'
              ? 'MM-dd-yyyy'
              : dateFormat === 'YYYY-MM-DD'
              ? 'yyyy-MM-dd'
              : dateFormat === 'DD-MMM-YYYY'
              ? 'dd-MMM-yyyy'
              : dateFormat === 'DD/MMM/YYYY'
              ? 'dd/MMM/yyyy'
              : 'dd-MM-yyyy'
          }
          required={isRequired}
          customInput={customInput || <DefaultCustomInput />}
          onChange={(date: any) => handleStartChange(date)}
          onBlur={handleStartBlur}
          onSelect={onSelect}
          {...innerProps}
          className='form-control'
          ref={defaultStartRef}
          showMonthDropdown
          showYearDropdown
          adjustDateOnChange={false}
          popperContainer={PopperContainer}
          locale={locale}
        />
        {startDate || endDateRange ? <span>-</span> : <React.Fragment />}
        <ReactDatePicker
          selectsEnd
          {...innerProps}
          strictParsing
          selected={endDateRange}
          startDate={startDate}
          endDate={endDateRange}
          dateFormat={
            dateFormat === 'MM/DD/YYYY'
              ? 'MM/dd/yyyy'
              : dateFormat === 'DD/MM/YYYY'
              ? 'dd/MM/yyyy'
              : dateFormat === 'YYYY/MM/DD'
              ? 'yyyy/MM/dd'
              : dateFormat === 'MM-DD-YYYY'
              ? 'MM-dd-yyyy'
              : dateFormat === 'YYYY-MM-DD'
              ? 'yyyy-MM-dd'
              : dateFormat === 'DD-MMM-YYYY'
              ? 'dd-MMM-yyyy'
              : dateFormat === 'DD/MMM/YYYY'
              ? 'dd/MMM/yyyy'
              : 'dd-MM-yyyy'
          }
          required={isRequired}
          customInput={customInput || <DefaultCustomInput />}
          onChange={(date: any) => handleEndChange(date)}
          className='form-control'
          onBlur={handleBlur}
          onChangeRaw={handleEndRaw}
          onSelect={onSelect}
          minDate={startDate}
          ref={defaultEndRef}
          showMonthDropdown
          showYearDropdown
          adjustDateOnChange={false}
          allowSameDay={false}
          popperContainer={PopperContainer}
          locale={locale}
        />
        {startDate && endDateRange && !isRequired && (
          <button onClick={clearAll} />
        )}
      </div>
      <HintText text={dateFormat || 'DD-MM-YYYY'} />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
