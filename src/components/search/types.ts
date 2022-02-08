import { CommonType } from '../../models/'

export type SearchType = CommonType<{
  isCounter: boolean
  minLength: number
  maxLength: number
  type: 'single' | 'multi'
  options: []
  value: string | any
}>
