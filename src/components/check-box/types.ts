import { CommonType } from '../../models/'

export type CheckBoxType = CommonType<{
  type:'single' | 'multiple'
  direction: 'horizontal' | 'vertical'
  options: []
  value: string | any
}>

