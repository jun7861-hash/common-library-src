import { CommonType } from '../../models'

export type EditableTableTypes = CommonType<{
  columns: any
  data?: any
  isBodyScroll?: any
  tableClassName?: any
  pageCount?: any
  showPagination?: any
  isLoading?: any
  updateSelectedItem?: (data: any) => void | undefined
  sortBy?: any
  tableId?: any
  renderRowSubComponent?: any
  maxHeight?: any
  limitSelection?: any
  typeSelectCheckbox?: any
  fetchData?: any
}>

export type TableTypes = CommonType<{
  columns?: any
  data?: any
  isBodyScroll?: any
  tableClassName?: any
  sortBy?: any
  showPagination?: boolean
  loading?: boolean
  tableId?: string
  renderRowSubComponent?: any
  maxHeight?: any
  limitSelection?: boolean
  typeSelectCheckbox?: any
  updateSelectedItem?: (data: any) => void | undefined
}>
