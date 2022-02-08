import React, { useState, useEffect, useRef } from 'react'
import ReactTime from 'react-datetime'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import classname from 'classnames'
import * as types from '../types'
import { ErrorMessage } from '../../common/error-message'
import { HintText } from '../../common/hint-text'
import { RequiredSign } from '../../common/required-indication'
import { ErrorStatusType } from '../../../utils/validator/types'
import { validator } from '../../../utils/validator/validate.generic'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datetime/css/react-datetime.css'
import '../index.scss'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import { i18n, getLocaleClass } from '../../common/locale/localeIndex'

/*
Modifies component to enable CustomInput
*/
const ModifiedTimePicker = ReactTime as React.ComponentType<
  ReactTime.DatetimepickerProps & {
    renderInput?: (
      props: any,
      openCalendar: () => void,
      closeCalendar: () => void
    ) => void
  }
>

export const TimeRangePicker: React.FC<types.TimeRangePickerType> = ({
  selected,
  endTime,
  texts,
  timeFormat,
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
  innerStartRef
}) => {
  const mainRef = useRef(innerRef || null)
  const languageDetector = useTranslation()
  const [startTime, setStartTime] = useState<any>(selected || new Date())
  const [endTimeRange, setEndTimeRange] = useState<any>(endTime || new Date())

  const [timeRange, setTimeRange] = useState<any>({
    startTime: startTime,
    endTime: endTimeRange
  })
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const timePickerClassName = classname(inputClassName, 'form-control')

  const inputProps = {
    ...innerProps,
    className: timePickerClassName,
    style: inputInlineStyle,
    required: isRequired
  }

  const defaultCustomInput1 = (props: any, openCalendar: any) => {
    return (
      <React.Fragment>
        <span
          {...props}
          style={{}}
          className='time-range-input'
          ref={innerStartRef}
          onClick={openCalendar}
          onFocus={(e: any) => e.target.blur()}
          minLength={timeFormat === 'HH:MM:SS' ? 3 : 0}
          maxLength={timeFormat === 'HH:MM:SS' ? 8 : 5}
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
          onClick={openCalendar}
          className='time-range-input'
          onFocus={(e: any) => e.target.blur()}
          ref={innerEndRef}
          minLength={timeFormat === 'HH:MM:SS' ? 3 : 0}
          maxLength={timeFormat === 'HH:MM:SS' ? 8 : 5}
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
    getLocaleClass(languageDetector.i18n.language)
  )

  const timeRangePickerClass = classname(
    'timeRangePickerClass',
    'form-control',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': !isRequired && timeRange.startTime && timeRange.endTime
    },
    inputClassName
  )

  const autoFillUpOnEnd = (time: any) => {
    const toBeFormat = timeFormat === 'HH:MM:SS' ? 'seconds' : 'minutes'
    const toBeSet: any = moment(time, timeFormat).add(1, toBeFormat)
    setEndTimeRange(toBeSet._d)
    setTimeRange({
      startTime: time,
      endTime: toBeSet._d
    })
  }

  const clearAll = () => {
    setStartTime(null)
    setEndTimeRange(null)
    setTimeRange({
      startTime: null,
      endTime: null
    })
    validateRange({
      startTime: null,
      endTime: null
    })
  }

  const handleStartChange = (time: any) => {
    const convertedTime = toHalfWidth(time)
    setStartTime(time._d || time)
    setTimeRange({
      ...timeRange,
      startTime: time._d || convertedTime || time
    })
    onChange(time)
  }

  const handleEndChange = (time: any) => {
    const convertedTime = toHalfWidth(time)
    setEndTimeRange(time._d || time)
    setTimeRange({
      ...timeRange,
      endTime: time._d || convertedTime
    })
    validateRange({
      startTime: timeRange.startTime,
      endTime: time._d || convertedTime
    })
    onChange(time)
  }

  const startBlur = () => {
    const fixedSpaces = toHalfWidth(timeRange.startTime) || timeRange.startTime
    const fixedTime: any = moment(
      fixedSpaces,
      timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm',
      true
    )
    setStartTime(fixedTime._d)
    if (fixedTime._isValid) {
      setTimeRange({
        ...timeRange,
        startTime: fixedTime._d || startTime
      })
      if (timeRange.endTime === null && timeRange.startTime !== null) {
        autoFillUpOnEnd(fixedTime._d || startTime)
      } else {
        handleBlur()
      }
    } else {
      const converted = toHalfWidth(startTime) || startTime
      setStartTime(converted)
    }
  }

  const validateRange = (timeRange) => {
    let result: any
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidTimeRange', {
            field: texts?.field || i18n.t('default_timeRange')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-time-range',
        error: texts?.validate,
        data: timeRange,
        format: timeFormat || 'HH:MM',
        field: texts?.field
      })
    } else {
      result = validator({
        type: 'time-range',
        error: texts?.validate,
        data: timeRange,
        format: timeFormat || 'HH:MM',
        field: texts?.field
      })
    }

    setError(result)
  }

  const handleBlur = () => {
    validateRange(timeRange)
  }

  const endBlur = (e) => {
    const fixedSpaces = toHalfWidth(timeRange.endTime) || timeRange.endTime
    const fixedTime: any = moment(
      fixedSpaces,
      timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm',
      true
    )
    if (fixedTime._isValid) {
      setEndTimeRange(fixedTime._d || endTime)
      setTimeRange({
        ...timeRange,
        endTime: fixedTime._d || endTime
      })
    } else {
      const converted = toHalfWidth(e) || e
      setEndTimeRange(converted)
    }
    handleBlur()
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidTimeRange', {
            field: texts?.field || i18n.t('default_timeRange')
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
    setStartTime(selected || new Date())
    setEndTimeRange(endTime || new Date())
  }, [
    invalid,
    languageDetector.i18n.language,
    selected,
    endTime,
    texts,
    timeFormat,
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
        className={timeRangePickerClass}
        onBlur={handleBlur}
        ref={mainRef}
        style={inputInlineStyle}
        {...innerProps}
      >
        {timeRange.startTime || timeRange.endTime ? (
          <React.Fragment />
        ) : (
          <span className='dateRangePh'>
            {texts?.placeholder ||
              i18n.t('placeholder_timeRangePicker', {
                field: texts?.field || i18n.t('default_timeRange')
              })}
          </span>
        )}
        <ModifiedTimePicker
          value={startTime}
          renderInput={customInput || defaultCustomInput1}
          inputProps={inputProps}
          dateFormat={false}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          onChange={(e: any) => handleStartChange(e)}
          onBlur={startBlur}
        />
        {timeRange.startTime || timeRange.endTime ? (
          <span>-</span>
        ) : (
          <React.Fragment />
        )}
        <ModifiedTimePicker
          value={endTimeRange}
          renderInput={customInput || defaultCustomInput2}
          inputProps={inputProps}
          dateFormat={false}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          onChange={(e: any) => handleEndChange(e)}
          onBlur={endBlur}
        />
        {!isRequired && timeRange.startTime && timeRange.endTime && (
          <button onClick={clearAll} />
        )}
      </div>
      <HintText text={timeFormat === 'HH:MM:SS' ? 'HH:MM:SS' : 'HH:MM'} />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
