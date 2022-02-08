import { CommonType } from '../../models/index'

export type DateTimeRangePickerType = CommonType<{
  /*
    Required! Defines what component will be render
  */
  type:
    | 'timepicker'
    | 'timerangepicker'
    | 'datepicker'
    | 'daterangepicker'
    | 'datetimepicker'
    | 'datetimerrangepicker'
  /*
    Defines whether the component is select of input
  */
  readOnly?: boolean
  selected?: any
  /*
  For Date's Component
  */
  dateFormat?:
    | 'DD-MM-YYYY'
    | 'MM-DD-YYYY'
    | 'YYYY-MM-DD'
    | 'DD/MM/YYYY'
    | 'MM/DD/YYYY'
    | 'YYYY/MM/DD'
    | 'DD-MMM-YYYY'
    | 'DD/MMM/YYYY'
    | undefined
  /*
  For Time's Component
  */
  timeFormat?: 'HH:MM:SS' | 'HH:MM'
  /*
    For End of DateRange
  */
  endDate?: Date
  /*
    For End of TimeRange
  */
  endTime?: Date | undefined
  /*
    For End of DateTimeRange
  */
  endDateTime?: Date | undefined
  customInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => void | React.ReactNode
  onSelect?: (
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) => void | undefined
  innerStartRef?: React.Ref<HTMLInputElement> | any
  innerEndRef?: React.Ref<HTMLInputElement> | any
  locale?: any
}>

export type DatePickerType = CommonType<{
  readOnly?: boolean
  selected: Date | undefined
  dateFormat:
    | 'DD-MM-YYYY'
    | 'DD/MM/YYYY'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'MM/DD/YYYY'
    | 'MM-DD-YYYY'
    | 'DD-MMM-YYYY'
    | 'DD/MMM/YYYY'
    | undefined
  customInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => void
  onSelect?: (
    date?: Date,
    event?: React.SyntheticEvent<any> | undefined
  ) => void | undefined
  locale?: any
}>

export type DateRangePickerType = CommonType<{
  readOnly?: boolean
  selected: Date | undefined
  endDate?: Date | undefined
  dateFormat:
    | 'DD-MM-YYYY'
    | 'DD/MM/YYYY'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'MM/DD/YYYY'
    | 'MM-DD-YYYY'
    | 'DD-MMM-YYYY'
    | 'DD/MMM/YYYY'
    | undefined
  customInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => void
  onSelect?: (
    date?: Date,
    event?: React.SyntheticEvent<any> | undefined
  ) => void | undefined
  innerStartRef?: React.Ref<HTMLInputElement> | any
  innerEndRef?: React.Ref<HTMLInputElement> | any
  locale?: any
}>

export type TimePickerType = CommonType<{
  selected: Date | undefined | string
  timeFormat: 'HH:MM:SS' | 'HH:MM' | undefined
  readOnly?: boolean
  customInput?: (
    props?: any,
    openCalendar?: () => void,
    closeCalendar?: () => void
  ) => void
  onSelect?: (
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) => void | undefined
}>

export type TimeRangePickerType = CommonType<{
  readOnly?: boolean
  selected: Date | undefined
  endTime?: Date | undefined
  timeFormat: 'HH:MM:SS' | 'HH:MM' | undefined
  customInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => void
  onSelect?: (
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) => void | undefined
  innerStartRef?: React.Ref<HTMLInputElement> | any
  innerEndRef?: React.Ref<HTMLInputElement> | any
}>

export type DateTimePickerType = CommonType<{
  readOnly?: boolean
  selected: Date | undefined
  timeFormat?: 'HH:MM:SS' | 'HH:MM' | undefined
  dateFormat:
    | 'DD-MM-YYYY'
    | 'DD/MM/YYYY'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'MM/DD/YYYY'
    | 'MM-DD-YYYY'
    | 'DD-MMM-YYYY'
    | 'DD/MMM/YYYY'
    | undefined
  customInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => void
  onSelect?: (
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) => void | undefined
  locale?: any
}>
