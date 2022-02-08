import { CommonType } from '../../models/'

export type DialogType = CommonType<{
  type: 'success'| 'warning'| 'error'| 'confirm' | 'info'
  wrapClassName: string
  modalClassName: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  backdropClassName?: string
  closeButtonClassName?: string
  callbackButtonClassName?: string
  headerText: string
  bodyText: string
  closeText: string
  callbackText: string
  isOpen: boolean
  keyboard: boolean
  onCallback: () => void
  onClose: () => void
  hideCloseButton?: boolean
  returnFocusAfterClose: boolean
}>
