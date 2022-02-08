import { CommonType } from '../../models'

export type EmailInputType = CommonType<{
  value: string | any
  maxLength?: number
  minLength?: number
}>
