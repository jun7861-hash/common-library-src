import React, { useState, useEffect, useRef } from 'react'
import ReactTime from 'react-datetime'
import moment from 'moment'
import classname from 'classnames'
import { useTranslation } from 'react-i18next'
import * as types from '../types'
import { ErrorMessage } from '../../common/error-message'
import { HintText } from '../../common/hint-text'
import { RequiredSign } from '../../common/required-indication'
import { ErrorStatusType } from '../../../utils/validator/types'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import { hourFormatHM, hourFormatHMS } from '../../../utils/regex'
import { validator } from '../../../utils/validator/validate.generic'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datetime/css/react-datetime.css'
import '../index.scss'
import { i18n, getLocaleClass } from '../../common/locale/localeIndex'

/*
Modifies component to enable CustomInput
*/
const ModifiedTimePicker = ReactTime as React.ComponentType<
  ReactTime.DatetimepickerProps & {
    renderInput?: (
      props: any,
      openCalendar?: () => void,
      closeCalendar?: () => void
    ) => void
  }
>

export const TimePicker: React.FC<types.TimePickerType> = ({
  selected,
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
  readOnly,
  invalid
}) => {
  const languageDetector = useTranslation()
  const [timeState, setTimeState] = useState<any>(selected || new Date())
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })
  const mainRef: any = useRef(innerRef || null)

  const timePickerClassName = classname(
    inputClassName,
    'form-control',
    {
      'is-invalid': invalid || !error.status
    },
    { 'has-remove-btn': timeState && !isRequired }
  )
  const inputProps = {
    ...innerProps,
    className: timePickerClassName,
    style: inputInlineStyle,
    placeholder:
      texts?.placeholder ||
      i18n.t(`placeholder_timePicker`, {
        field: texts?.field || i18n.t('default_time')
      }),
    ref: mainRef,
    required: isRequired
  }

  const defaultCustomInput = (props: any, openCalendar: any) => {
    const clear = () => {
      props.onChange({ target: { value: '' } })
    }

    return (
      <React.Fragment>
        <input
          {...props}
          onClick={openCalendar}
          onFocus={(e: any) => {
            if (readOnly) {
              e.target.blur()
            } else if (readOnly === undefined) {
              e.target.blur()
            }
          }}
          minLength={timeFormat === 'HH:MM:SS' ? 3 : 0}
          maxLength={timeFormat === 'HH:MM:SS' ? 8 : 5}
        />
        {timeState && !isRequired && (
          <button onClick={clear} className='clearBtn' />
        )}
      </React.Fragment>
    )
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const handleChange = (time: any) => {
    const hourFormat = timeFormat === 'HH:MM:SS' ? hourFormatHMS : hourFormatHM
    const checkTime = hourFormat.test(time)
    const checkFullWidthTime = hourFormat.test(toHalfWidth(time))
    if (checkTime || checkFullWidthTime) {
      setTimeState(time)
    }
    setTimeState(time._d)
    onChange(time)
  }

  const handleBlur = (e: any) => {
    let result: any

    const convertedWidth = e !== '' ? `2020-01-01 ${toHalfWidth(e)}` : ''
    const fixSpaces = e._d || convertedWidth
    const value: any = moment(fixSpaces).format(
      timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'
    )
    const timeValid = moment(convertedWidth).isValid()

    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidTime', {
            field: texts?.field || i18n.t('default_time')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-time',
        data: timeValid ? value : fixSpaces.toString(),
        error: texts?.validate,
        format: timeFormat || 'HH:MM',
        minLength: timeFormat === 'HH:MM:SS' ? 3 : 0,
        field: texts?.field
      })
    } else {
      result = validator({
        type: 'time',
        data: timeValid ? value : fixSpaces.toString(),
        error: texts?.validate,
        format: timeFormat || 'HH:MM',
        minLength: timeFormat === 'HH:MM:SS' ? 3 : 0,
        field: texts?.field
      })
    }
    setError(result)
    setTimeState(timeValid ? value : e)
  }

  useEffect(() => {
    if (invalid) {
      setError({
        status: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidTime', {
            field: texts?.field || i18n.t('default_time')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && handleBlur(timeState)
    setTimeState(selected)
  }, [
    invalid,
    languageDetector.i18n.language,
    selected,
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
    readOnly
  ])
  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      <div className='timePickerClass'>
        {isRequiredMark && <RequiredSign />}
        <ModifiedTimePicker
          value={timeState}
          renderInput={customInput || defaultCustomInput}
          inputProps={inputProps}
          dateFormat={false}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          onChange={(e: any) => handleChange(e)}
          onBlur={handleBlur}
        />
      </div>
      <HintText text={timeFormat === 'HH:MM:SS' ? 'HH:MM:SS' : 'HH:MM'} />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
