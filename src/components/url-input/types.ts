import { CommonType } from '../../models/'

export type URLInputType = CommonType<{
  maxLength?: number
  minLength?: number
  isHalfWidth?: boolean
  value: string | any
  acceptType?: any
}>
