import React, { useState, useEffect } from 'react'
import ReactDateTime from 'react-datetime'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import classname from 'classnames'
import * as types from '../types'
import { HintText } from '../../common/hint-text'
import { RequiredSign } from '../../common/required-indication'
import { ErrorMessage } from '../../common/error-message'
import { ErrorStatusType } from '../../../utils/validator/types'
import { validator } from '../../../utils/validator/validate.generic'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datetime/css/react-datetime.css'
import '../index.scss'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import i18next from '../../i18n'
import { getLocaleClass } from '../../common/locale/localeIndex'

/*
Modifies component to enable CustomInput
*/
const ModifiedDateTimePicker = ReactDateTime as React.ComponentType<
  ReactDateTime.DatetimepickerProps & {
    renderInput?: (
      props: any,
      openCalendar: () => void,
      closeCalendar: () => void
    ) => void
  }
>

export const DateTimeRangePicker: React.FC<types.DateTimeRangePickerType> = ({
  selected,
  texts,
  timeFormat,
  dateFormat,
  endDateTime,
  innerProps,
  innerRef,
  wrapperClassName,
  inputClassName,
  wrapperInlineStyle,
  inputInlineStyle,
  isRequired,
  isRequiredMark,
  isInputGroup,
  customInput,
  onChange,
  invalid,
  innerEndRef,
  innerStartRef,
  locale
}) => {
  const { t } = useTranslation()
  const [startDate, setStateDate] = useState<any>(selected || new Date())
  const [endDate, setEndDate] = useState<any>(endDateTime || new Date())

  const [rangeDate, setRangeDate] = useState<any>({
    startDateTime: startDate,
    endDateTime: endDate
  })
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const dateTimeRangePickerClass = classname(
    inputClassName,
    'form-control',
    'dateTimeRangePickerClass',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn':
        !isRequired && rangeDate.startDateTime && rangeDate.endDateTime
    }
  )

  const inputProps = {
    ...innerProps,
    className: dateTimeRangePickerClass,
    style: inputInlineStyle,
    required: isRequired
  }

  const defaultCustomInput1 = (props: any, openCalendar: any) => {
    return (
      <React.Fragment>
        <span
          {...props}
          style={{}}
          className='date-time-range-input'
          ref={innerStartRef}
          onClick={openCalendar}
          onFocus={(e: any) => e.target.blur()}
        >
          <button className='range-btn'>{props.value}</button>
        </span>
      </React.Fragment>
    )
  }

  const defaultCustomInput2 = (props: any, openCalendar: any) => {
    return (
      <React.Fragment>
        <span
          {...props}
          style={{}}
          className='date-time-range-input'
          ref={innerEndRef}
          onClick={openCalendar}
          onFocus={(e: any) => e.target.blur()}
        >
          <button className='range-btn'>{props.value}</button>
        </span>
      </React.Fragment>
    )
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(i18next.language)
  )

  const handleStartChange = (date: any) => {
    const convertedDate = toHalfWidth(date)
    setStateDate(date._d || date)
    setRangeDate({
      startDateTime: date._d || convertedDate || date,
      endDateTime: rangeDate.endDateTime
    })
    validateRange({
      startDateTime: date._d || convertedDate || date,
      endDateTime: rangeDate.endDateTime
    })
    onChange(date)
  }

  const autoFillUpOnEnd = (dateTime: any) => {
    const toBeSet: any = moment(
      dateTime,
      `${dateFormat || 'DD-MM-YYYY'}${timeFormat || 'HH:MM'}`,
      true
    ).add(1, 'days')
    setEndDate(toBeSet._d)
    setRangeDate({
      startDateTime: dateTime,
      endDateTime: toBeSet._d
    })
    validateRange({
      startDateTime: dateTime,
      endDateTime: toBeSet._d
    })
  }

  const handleEndChange = (date: any) => {
    const convertedDate = toHalfWidth(date)
    setEndDate(date._d || date)
    setRangeDate({
      startDateTime: rangeDate.startDateTime,
      endDateTime: date._d || convertedDate || date
    })
    onChange(date)
  }

  const validateRange = (rangeDate) => {
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18next.t('error_messages_invalidDateTimeRange', {
            field: texts?.field || i18next.t('default_dateTimeRange')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-date-time-range',
        data: rangeDate,
        format: `${dateFormat || 'DD-MM-YYYY'} ${timeFormat || 'HH:MM'}`,
        field: texts?.field,
        error:
          texts?.validate ||
          i18next.t('error_messages_invalidDateTimeRange', {
            field: texts?.field || i18next.t('default_dateTimeRange')
          })
      })
    } else {
      result = validator({
        type: 'date-time-range',
        data: rangeDate,
        format: `${dateFormat || 'DD-MM-YYYY'} ${timeFormat || 'HH:MM'}`,
        field: texts?.field,
        error:
          texts?.validate ||
          i18next.t('error_messages_invalidDateTimeRange', {
            field: texts?.field || i18next.t('default_dateTimeRange')
          })
      })
    }
    setError(result)
  }

  const handleStartBlur = () => {
    const fixedSpaces =
      toHalfWidth(rangeDate.startDateTime) || rangeDate.startDateTime
    const toBeFormat = `${dateFormat || 'DD-MM-YYYY'} ${
      timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'
    }`
    const fixedTime: any = moment(fixedSpaces, toBeFormat, true)
    if (fixedTime._isValid) {
      setStateDate(fixedTime._d || startDate)
      setRangeDate({
        ...rangeDate,
        startDateTime: fixedTime._d || startDate
      })
      if (
        (rangeDate.endDateTime === null || rangeDate.endDateTime === '') &&
        rangeDate.startDateTime !== null
      ) {
        autoFillUpOnEnd(fixedTime._d || startDate)
      } else {
        validateRange(rangeDate)
      }
    } else {
      const converted = toHalfWidth(startDate) || startDate
      setStateDate(converted)
    }
  }

  const handleEndBlur = (e) => {
    const fixedSpaces =
      toHalfWidth(rangeDate.endDateTime) || rangeDate.endDateTime
    const toBeFormat = `${dateFormat || 'DD-MM-YYYY'} ${
      timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'
    }`
    const fixedTime: any = moment(fixedSpaces, toBeFormat, true)
    if (fixedTime._isValid) {
      setEndDate(fixedTime._d || endDateTime)
      setRangeDate({
        ...rangeDate,
        endDateTime: fixedTime._d || endDateTime
      })
    } else {
      const converted = toHalfWidth(e) || e
      setEndDate(converted)
    }
    validateRange(rangeDate)
  }

  const clearAll = () => {
    setStateDate(null)
    setEndDate(null)
    setRangeDate({
      startDateTime: null,
      endDateTime: null
    })
    validateRange({
      startDateTime: null,
      endDateTime: null
    })
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          t('error_messages_invalidDateTimeRange', {
            field: texts?.field || i18next.t('default_dateTimeRange')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && validateRange(rangeDate)
    setStateDate(selected || new Date())
    setEndDate(endDateTime || new Date())
    setRangeDate({
      startDateTime: selected || new Date(),
      endDateTime: endDateTime || new Date()
    })
  }, [
    invalid,
    i18next.language,
    selected,
    endDateTime,
    locale,
    dateFormat,
    timeFormat,
    texts,
    innerProps,
    innerRef,
    wrapperClassName,
    inputClassName,
    wrapperInlineStyle,
    inputInlineStyle,
    isRequired,
    isRequiredMark,
    isInputGroup,
    customInput,
    onChange,
    innerEndRef,
    innerStartRef
  ])

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      {isRequiredMark && <RequiredSign />}
      <div
        className={dateTimeRangePickerClass}
        style={inputInlineStyle}
        ref={innerRef}
        {...innerProps}
      >
        {rangeDate.startDateTime || rangeDate.endDateTime ? (
          <React.Fragment />
        ) : (
          <span className='dateRangePh'>
            {texts?.placeholder ||
              t('placeholder_dateAndTimeRangePicker', {
                field: texts?.field || i18next.t('default_dateTimeRange')
              })}
          </span>
        )}
        <ModifiedDateTimePicker
          locale={locale}
          value={startDate}
          dateFormat={dateFormat || 'DD-MM-YYYY'}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          renderInput={customInput || defaultCustomInput1}
          inputProps={inputProps}
          onChange={(e: any) => handleStartChange(e)}
          onBlur={handleStartBlur}
          renderDay={(props: any, currentDate: any) => {
            return (
              <td
                {...props}
                className={
                  currentDate >= startDate && currentDate <= endDate
                    ? 'rdtActive rdtDay'
                    : currentDate + 1 === startDate
                    ? 'rdtActive rdtDay'
                    : 'rdtDay'
                }
              >
                {currentDate.date()}
              </td>
            )
          }}
        />
        {rangeDate.startDateTime || rangeDate.endDateTime ? (
          <span>-</span>
        ) : (
          <React.Fragment />
        )}
        <ModifiedDateTimePicker
          value={endDate}
          locale={locale}
          renderInput={customInput || defaultCustomInput2}
          inputProps={inputProps}
          dateFormat={dateFormat || 'DD-MM-YYYY'}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          onChange={(e: any) => handleEndChange(e)}
          disableOnClickOutside
          onBlur={handleEndBlur}
          renderDay={(props: any, currentDate: any) => {
            return (
              <td
                {...props}
                className={
                  currentDate < startDate
                    ? 'unselected'
                    : 'rdtDay' &&
                      (currentDate >= startDate && currentDate <= endDate
                        ? 'rdtActive rdtDay'
                        : currentDate + 1 === startDate
                        ? 'rdtActive rdtDay'
                        : 'rdtDay')
                }
              >
                {currentDate.date()}
              </td>
            )
          }}
        />
        {!isRequired && rangeDate.startDateTime && rangeDate.endDateTime && (
          <button onClick={clearAll} />
        )}
      </div>
      <HintText
        text={`${dateFormat || 'DD-MM-YYYY'} ${timeFormat || 'HH:MM'} - ${
          dateFormat || 'DD-MM-YYYY'
        } ${timeFormat || 'HH:MM'}`}
      />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
