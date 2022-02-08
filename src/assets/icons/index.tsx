import React from 'react'
import MaterialIcon from 'material-icons-react'

export const SuccessIcon: React.FC<{}> = () => {
  return <MaterialIcon icon='check' color='#28C7B1' size='medium' />
}

export const WarningIcon: React.FC<{}> = () => {
  return <MaterialIcon icon='warning' color='#FECC68' size='medium' />
}

export const ErrorIcon: React.FC<{}> = () => {
  return <MaterialIcon icon='error_outline' color='#E54E66' size='medium' />
}

export const ConfirmIcon: React.FC<{}> = () => {
  return <MaterialIcon icon='playlist_add_check' color='#6B7376' size='medium' />
}

export const InfoIcon: React.FC<{}> = () => {
  return <MaterialIcon icon='info' color='#138496' size='medium' />
}
