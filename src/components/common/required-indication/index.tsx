import React from 'react'
import { i18n } from '../../common/locale/localeIndex'

export const RequiredSign: React.FC<{}> = () => {
  return (
    <span className='text-danger cp-required-sign'>
      {i18n.t('required_sign')}
    </span>
  )
}
