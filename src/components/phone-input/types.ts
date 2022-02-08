import { CommonType } from '../../models/index'

export type PhoneInputType = CommonType<{
  value: string | any
  maxLength?: number
  minLength?: number
}>
