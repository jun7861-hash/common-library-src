import React, { useState, useEffect } from 'react'
import ReactDateTime from 'react-datetime'
import { useTranslation } from 'react-i18next'
import classname from 'classnames'
import * as types from '../types'
import { RequiredSign } from '../../common/required-indication'
import { ErrorMessage } from '../../common/error-message'
import { ErrorStatusType } from '../../../utils/validator/types'
import { HintText } from '../../common/hint-text'
import { validator } from '../../../utils/validator/validate.generic'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datetime/css/react-datetime.css'
import '../index.scss'
import { toHalfWidth } from '../../../utils/toHalfWidthConverter'
import { i18n, getLocaleClass } from '../../common/locale/localeIndex'

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

export const DateTimePicker: React.FC<types.DateTimePickerType> = ({
  selected,
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
  invalid,
  timeFormat,
  dateFormat,
  locale
}) => {
  const languageDetector = useTranslation()
  const [dateState, setDateState] = useState(selected || new Date())
  const [error, setError] = useState<ErrorStatusType>({
    status: true,
    error_code: null,
    error_message: null
  })

  const dateTimePickerClass = classname(
    inputClassName,
    'form-control',
    {
      'is-invalid': invalid || !error.status
    },
    {
      'has-remove-btn': dateState && !isRequired
    }
  )

  const inputProps = {
    ...innerProps,
    className: dateTimePickerClass,
    style: inputInlineStyle,
    placeholder:
      texts?.placeholder ||
      i18n.t(`placeholder_dateAndTimePicker`, {
        field: texts?.field || i18n.t('default_dateTime')
      }),
    ref: innerRef,
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
          onFocus={(e: any) => e.target.blur()}
        />
        {dateState && !isRequired && <button onClick={clear} />}
      </React.Fragment>
    )
  }

  const containerClassName = classname(
    wrapperClassName,
    isInputGroup && 'isInputGroupClass',
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const handleChange = (date: any) => {
    setDateState(date._d)
    onChange(date)
    setError(error)
  }

  const handleBlur = (e: any) => {
    let result: any
    const convertedDateTime: any = toHalfWidth(e) || e
    setDateState(convertedDateTime)
    if (invalid) {
      result = {
        valid: false,
        error_code: 'invalid',
        error_message:
          texts?.validate ||
          i18n.t('error_messages_invalidDateTime', {
            field: texts?.field || i18n.t('default_dateTime')
          })
      }
    } else if (isRequired) {
      result = validator({
        type: 'required-date-time',
        data: convertedDateTime || e._d,
        field: texts?.field,
        error:
          texts?.validate ||
          i18n.t('error_messages_invalidDateTime', {
            field: texts?.field || i18n.t('default_dateTime')
          }),
        format: `${dateFormat || 'DD-MM-YYYY'} ${
          timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'
        }`
      })
    } else {
      result = validator({
        type: 'date-time',
        data: convertedDateTime || e._d,
        field: texts?.field,
        error:
          texts?.validate ||
          i18n.t('error_messages_invalidDateTime', {
            field: texts?.field || i18n.t('default_dateTime')
          }),
        format: `${dateFormat || 'DD-MM-YYYY'} ${
          timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'
        }`
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
          i18n.t('error_messages_invalidDateTime', {
            field: texts?.field || i18n.t('default_dateTime')
          })
      })
    } else {
      setError({
        status: true,
        error_code: null,
        error_message: null
      })
    }
    error.error_message && handleBlur(dateState)
    setDateState(selected || new Date())
  }, [
    invalid,
    languageDetector.i18n.language,
    selected,
    dateFormat,
    timeFormat,
    locale,
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
    onChange
  ])

  return (
    <div style={wrapperInlineStyle} className={containerClassName}>
      <div className='dateTimePickerClass'>
        {isRequiredMark && <RequiredSign />}
        <ModifiedDateTimePicker
          value={dateState}
          defaultValue={dateState}
          renderInput={customInput || defaultCustomInput}
          inputProps={inputProps}
          dateFormat={dateFormat || 'DD-MM-YYYY'}
          timeFormat={timeFormat === 'HH:MM:SS' ? 'HH:mm:ss' : 'HH:mm'}
          onChange={(e: any) => handleChange(e)}
          onBlur={handleBlur}
          locale={locale}
        />
      </div>
      <HintText
        text={`${dateFormat || 'DD-MM-YYYY'} ${timeFormat || 'HH:MM'}`}
      />
      {error && <ErrorMessage error={error.error_message} />}
    </div>
  )
}
