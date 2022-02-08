import React from 'react'
import { Label } from 'reactstrap'
import * as types from './types'
import { emojiCount } from '../../../utils/emojiCounter'

export const TextCounter: React.FC<types.CounterType> = ({
  value,
  max,
  wrapperClassName
}) => {
  if (value && value.length > 0)
    return (
      <Label className={wrapperClassName || `inline mb-0 cp-counter`}>
        <span className='text-muted text-right'>
          <span className={value.length >= (max || 2000) ? 'text-danger' : ''}>
            {emojiCount(value).length}
          </span>
          /{max || 2000}
        </span>
      </Label>
    )
  return <React.Fragment />
}
