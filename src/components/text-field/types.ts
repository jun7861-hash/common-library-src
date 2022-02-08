import { CommonType } from '../../models/'

export type TextFieldType = CommonType<{
  value: string | any
  maxLength?: number
  minLength?: number
  isHalfWidth?: boolean
}>
