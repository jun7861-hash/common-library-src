import { CommonType } from '../../models/'

export type CountryCodeType = CommonType<{
  isCounter: boolean
  //default 2 
  minLength: number
  //default 3
  maxLength: number
  value: string | any
}>

