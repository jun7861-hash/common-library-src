import React from 'react'
import classname from 'classnames'
import { i18n, getLocaleClass } from '../common/locale/localeIndex'
import { useTranslation } from 'react-i18next'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import * as types from './types'
import {
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  ConfirmIcon,
  InfoIcon
} from '../../assets/icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

export const Dialog: React.FC<types.DialogType> = ({
  type,
  headerText,
  bodyText,
  callbackText,
  closeText,
  isOpen,
  headerClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  callbackButtonClassName,
  hideCloseButton,
  onCallback,
  onClose,
  innerRef,
  modalClassName,
  wrapClassName,
  backdropClassName,
  keyboard,
  returnFocusAfterClose
}) => {
  const languageDetector = useTranslation()

  const afterConfirmation = () => {
    onCallback()
    onClose()
  }

  const defaultText = () => {
    let textHeader: string
    switch (type) {
      case 'confirm':
        textHeader = i18n.t('headerText_confirm')
        return textHeader
      case 'success':
        textHeader = i18n.t('headerText_success')
        return textHeader
      case 'error':
        textHeader = i18n.t('headerText_error')
        return textHeader
      case 'warning':
        textHeader = i18n.t('headerText_warning')
        return textHeader
      case 'info':
        textHeader = i18n.t('headerText_info')
        return textHeader
      default:
        textHeader = i18n.t('headerText_success')
        return textHeader
    }
  }

  const containerClassName = classname(
    wrapClassName,
    'cpwrapper',
    getLocaleClass(languageDetector.i18n.language)
  )

  const dialogClassName = classname(modalClassName, 'dialogClass')

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        toggle={() => onClose()}
        className={dialogClassName}
        ref={innerRef}
        backdropClassName={backdropClassName}
        wrapClassName={containerClassName}
        keyboard={keyboard || false}
        returnFocusAfterClose={returnFocusAfterClose || false}
        backdrop='static'
      >
        <ModalHeader className={headerClassName}>
          {type === 'success' ? (
            <SuccessIcon />
          ) : type === 'warning' ? (
            <WarningIcon />
          ) : type === 'error' ? (
            <ErrorIcon />
          ) : type === 'confirm' ? (
            <ConfirmIcon />
          ) : type === 'info' ? (
            <InfoIcon />
          ) : (
            <SuccessIcon />
          )}{' '}
          {headerText || defaultText()}
        </ModalHeader>
        <ModalBody className={bodyClassName}>
          <p>{bodyText}</p>
        </ModalBody>
        <ModalFooter className={footerClassName}>
          {!hideCloseButton && (
            <Button
              onClick={() => onClose()}
              color={closeButtonClassName || 'default'}
            >
              {closeText || i18n.t('footerText_close')}
            </Button>
          )}
          {onCallback && (
            <Button
              onClick={() => afterConfirmation()}
              color={callbackButtonClassName || 'primary'}
            >
              {callbackText || i18n.t('footerText_callback')}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
