import React, { useEffect } from 'react'
import * as types from './types'

export const ErrorMessage: React.FC<types.ErrorType> = ({ error }) => {
  useEffect(() => {}, [error])
  if (error) return <p className='text-danger mb-0 cp-invalid-msg'>{error}</p>
  return <React.Fragment />
}
