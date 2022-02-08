/* eslint-disable camelcase */
export type ValidatorType = {
  type: string
  data: any
  isRequired?: boolean
  error?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  format?: string
  locale?: string | undefined
  field?: string | undefined
  acceptType?: any
}

export type ErrorStatusType = {
  status?: boolean
  data?: ''
  type?: string | undefined
  error_code: string | null
  error_message: string | null
}

export type ReturnStatusType = {
  status: boolean
  data: [ErrorStatusType]
}
