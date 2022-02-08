import { CommonType } from '../../models/'

export type TextAreaInputType = CommonType<{
  maxLength?: number
  minLength?: number
  isHalfWidth?: boolean
  value: string | any
}>
