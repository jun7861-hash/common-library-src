import React from 'react'
import * as types from './types'

export const HintText: React.FC<types.HintTextType> = ({ text }) => {
  return <p className='text-muted mb-0 cp-hint'>{text}</p>
}
