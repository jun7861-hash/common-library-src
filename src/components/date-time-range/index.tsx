import React from 'react'
import 'moment/locale/ja'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import en_US from 'date-fns/locale/en-US'
import ja_JP from 'date-fns/locale/ja'
import zh_TW from 'date-fns/locale/zh-TW'
import * as types from './types'
import { TimePicker } from './time-picker'
import { TimeRangePicker } from './time-range-picker'
import { DatePicker } from './date-picker/'
import { DateRangePicker } from './date-range-picker'
import { DateTimePicker } from './date-time-picker'
import { DateTimeRangePicker as ReactDateTimeRangePicker } from './date-time-range-picker'

export const DateTimeRangePicker: React.FC<types.DateTimeRangePickerType> = ({
  type,
  selected,
  endDate,
  endTime,
  texts,
  innerProps,
  innerRef,
  innerStartRef,
  innerEndRef,
  wrapperClassName,
  wrapperInlineStyle,
  inputInlineStyle,
  inputClassName,
  isRequired,
  isRequiredMark,
  isInputGroup,
  readOnly,
  dateFormat,
  timeFormat,
  invalid,
  endDateTime,
  onChange,
  onSelect,
  customInput
}) => {
  const i18n = useTranslation()
  const toBeLocale = i18n[1].language
  registerLocale('en_US', en_US)
  registerLocale('ja_JP', ja_JP)
  registerLocale('zh_TW', zh_TW)
  setDefaultLocale('en_US')

  if (type === 'timepicker')
    return (
      <TimePicker
        selected={selected}
        texts={texts}
        innerProps={innerProps}
        innerRef={innerRef}
        customInput={customInput}
        onChange={onChange}
        onSelect={onSelect}
        wrapperClassName={wrapperClassName}
        wrapperInlineStyle={wrapperInlineStyle}
        inputClassName={inputClassName}
        inputInlineStyle={inputInlineStyle}
        isRequired={isRequired}
        isRequiredMark={isRequiredMark}
        isInputGroup={isInputGroup}
        readOnly={readOnly}
        timeFormat={timeFormat}
        invalid={invalid}
      />
    )
  if (type === 'timerangepicker')
    return (
      <TimeRangePicker
        selected={selected}
        endTime={endTime}
        texts={texts}
        innerProps={innerProps}
        innerRef={innerRef}
        customInput={customInput}
        onChange={onChange}
        onSelect={onSelect}
        wrapperClassName={wrapperClassName}
        wrapperInlineStyle={wrapperInlineStyle}
        inputClassName={inputClassName}
        inputInlineStyle={inputInlineStyle}
        isRequired={isRequired}
        isRequiredMark={isRequiredMark}
        isInputGroup={isInputGroup}
        timeFormat={timeFormat}
        invalid={invalid}
      />
    )
  if (type === 'datepicker')
    return (
      <DatePicker
        locale={toBeLocale}
        selected={selected}
        texts={texts}
        innerProps={innerProps}
        innerRef={innerRef}
        customInput={customInput}
        onChange={onChange}
        onSelect={onSelect}
        wrapperClassName={wrapperClassName}
        wrapperInlineStyle={wrapperInlineStyle}
        inputClassName={inputClassName}
        inputInlineStyle={inputInlineStyle}
        isRequired={isRequired}
        isRequiredMark={isRequiredMark}
        isInputGroup={isInputGroup}
        readOnly={readOnly}
        dateFormat={dateFormat}
        invalid={invalid}
      />
    )
  if (type === 'daterangepicker')
    return (
      <DateRangePicker
        locale={toBeLocale}
        selected={selected}
        endDate={endDate}
        texts={texts}
        innerProps={innerProps}
        innerRef={innerRef}
        customInput={customInput}
        onChange={onChange}
        onSelect={onSelect}
        wrapperClassName={wrapperClassName}
        wrapperInlineStyle={wrapperInlineStyle}
        inputClassName={inputClassName}
        inputInlineStyle={inputInlineStyle}
        isRequired={isRequired}
        isRequiredMark={isRequiredMark}
        isInputGroup={isInputGroup}
        dateFormat={dateFormat}
        invalid={invalid}
        innerStartRef={innerStartRef}
        innerEndRef={innerEndRef}
      />
    )
  if (type === 'datetimepicker')
    return (
      <DateTimePicker
        selected={selected}
        texts={texts}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        innerProps={innerProps}
        innerRef={innerRef}
        customInput={customInput}
        onChange={onChange}
        onSelect={onSelect}
        wrapperClassName={wrapperClassName}
        wrapperInlineStyle={wrapperInlineStyle}
        inputClassName={inputClassName}
        inputInlineStyle={inputInlineStyle}
        isRequired={isRequired}
        isRequiredMark={isRequiredMark}
        isInputGroup={isInputGroup}
        readOnly={readOnly}
        invalid={invalid}
        locale={toBeLocale}
      />
    )
  return (
    <ReactDateTimeRangePicker
      type={type}
      selected={selected}
      texts={texts}
      innerProps={innerProps}
      innerRef={innerRef}
      onChange={onChange}
      onSelect={onSelect}
      customInput={customInput}
      wrapperClassName={wrapperClassName}
      wrapperInlineStyle={wrapperInlineStyle}
      inputClassName={inputClassName}
      inputInlineStyle={inputInlineStyle}
      isRequired={isRequired}
      isRequiredMark={isRequiredMark}
      isInputGroup={isInputGroup}
      readOnly={readOnly}
      dateFormat={dateFormat}
      invalid={invalid}
      innerEndRef={innerEndRef}
      innerStartRef={innerStartRef}
      endDateTime={endDateTime}
      locale={toBeLocale}
    />
  )
}
