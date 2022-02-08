import { CommonType } from '../../models/'

export type SelectInputTypes = CommonType<{
  value?: string | [] | {} | null | undefined
  menuIsOpen?: boolean
  isCounter?: boolean
  minLength?: number
  maxLength?: number
  isMulti?: boolean
  options?: any
  getOptionValue?: any
  getOptionLabel?: any
  formatGroupLabel?: any
  isClearable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isSearchable?: boolean
  maxMenuHeight?: number
  onKeyDown?: any
  onCreateOption?: any
  menuPlacement?: 'auto' | 'bottom' | 'top'
  menuPortalTarget?: any
  classNamePrefix?: string
  inputValue?: string
  components?: {}
  styles?: {}
  onInputChange?: any
  onChange?: any
  dataType?: 'array' | 'object' | 'string'
  createOpt ?: boolean
}>
