import { CommonType } from '../../models/'
export type PostalInputType = CommonType<{
  maxLength?: number
  minLength?: number
  isHalfWidth?: boolean
  value: string | any
}>
