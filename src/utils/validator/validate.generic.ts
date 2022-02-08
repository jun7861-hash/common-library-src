import { i18n } from '../../components/common/locale/localeIndex'
import { ValidatorType, ErrorStatusType, ReturnStatusType } from './types'
import { emojiCount } from '../emojiCounter'
import * as regex from '../regex'
import moment from 'moment'

const validate = ({
  type,
  data,
  error,
  minLength,
  maxLength,
  max,
  min,
  format,
  locale,
  field,
  acceptType,
  isRequired
}: ValidatorType) => {
  const mapType = acceptType ? acceptType.join('|') : 'http|https'
  /*
  Initializing Error Status
  */
  let errorStatus: ErrorStatusType = {
    status: true,
    data: '',
    type: '',
    error_code: null,
    error_message: null
  }
  /*
  repeating validation in URL
  */
  const urlValidation = !data.match(regex.noWhiteSpace) && !data.match(regex.noDotinLast)
  && !data.match(new RegExp(
    `((^${mapType}):\\/{2})+${regex.invalidUrl1
      .toString()
      .slice(1, -1)}`,
    `gi`
  )) && !data.match(new RegExp(
      `((^${mapType}):\\/{2})+${regex.invalidUrl2
        .toString()
        .slice(1, -1)}`,
      `gi`
    )) && !data.match(new RegExp(
      `((^${mapType}):\\/{2})+${regex.invalidUrl3
        .toString()
        .slice(1, -1)}`,
      `gi`
    )) && !data.match(new RegExp(
      `((^${mapType}):\\/{2})+${regex.invalidUrl4
        .toString()
        .slice(1, -1)}`,
      `gi`
    ))

  /*
  Case validations
  */
  switch (type) {
    case 'textfield':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      }
      return errorStatus
    case 'textarea':
      if (!isRequired || isRequired === undefined) {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 2000) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 2000,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      } else {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 2000) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 2000,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      }
      return errorStatus
    case 'search':
      if (!isRequired || isRequired === undefined) {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      } else {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      }
      return errorStatus
    case 'email':
      if (!isRequired) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 321) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 321,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if (
            regex.emailInputFormat.test(String(data).toLocaleLowerCase())
          ) {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          } else {
            errorStatus = {
              status: false,
              data: data,
              type: type,
              error_code: 'invalid',
              error_message:
                error ||
                i18n.t('error_messages_invalidEmail', {
                  field: field || i18n.t('default_fieldName')
                })
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 0) > emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 0,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 321) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 321,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if (
            regex.emailInputFormat.test(String(data).toLocaleLowerCase())
          ) {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          } else {
            errorStatus = {
              status: false,
              data: data,
              type: type,
              error_code: 'invalid',
              error_message:
                error ||
                i18n.t('error_messages_invalidEmail', {
                  field: field || i18n.t('default_fieldName')
                })
            }
          }
        }
      }
      return errorStatus
    case 'postal':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 3) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 3,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 10) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 10,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (data.match(regex.numberCombination)) {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPostal', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            } else if (data.match(regex.singleHypenSpaceAndHypenWithNumber)) {
              if (data.match(regex.numberExp)) {
                if (data.length < 3 || data.length > 7) {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidPostal', {
                        field: field || i18n.t('default_fieldName')
                      })
                  }
                }
              } else {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPostal', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 3) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 10) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 10,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (data.match(regex.numberCombination)) {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPostal', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            } else if (data.match(regex.singleHypenSpaceAndHypenWithNumber)) {
              if (data.match(regex.numberExp)) {
                if (data.length < 3 || data.length > 7) {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidPostal', {
                        field: field || i18n.t('default_fieldName')
                      })
                  }
                }
              } else {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPostal', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      }
      return errorStatus
    case 'url':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_URL')
              })}`
            }
          } else if ((maxLength || 2000) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 2000,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (!acceptType || acceptType === undefined) {
              if (
                data === 'http://index.html' ||
                data === 'https://index.html' ||
                data === 'http://www.com' ||
                data === 'https://www.com'
              ) {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^http|https):\\/{2})+${regex.validDomain
                      .toString()
                      .slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (data.match(regex.urlPort)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data === 'http://index.html' ||
              data === 'https://index.html' ||
              data === 'http://www.com' ||
              data === 'https://www.com'
            ) {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidURL', {
                    field: field || i18n.t('default_URL')
                  })
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('http') &&
              data.includes('http') &&
              acceptType.includes('https') &&
              data.includes('https')
            ) {
              if (data.match(regex.urlPort)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('http') &&
              data.includes('http')
            ) {
              if (data.match(regex.urlPortHTTP)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('https') &&
              data.includes('https')
            ) {
              if (data.match(regex.urlPortHTTPS)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('mailto') &&
              acceptType?.includes('news')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'mailto', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('mailto')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'mailto'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('news')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('mailto') &&
              acceptType?.includes('news')
            ) {
              if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['mailto', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('wais')) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('mailto')) {
              if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['mailto'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('news')) {
              if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else {
              if (
                data.match(
                  new RegExp(
                    `((^${mapType}):\\/{2})+${regex.validDomain
                      .toString()
                      .slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_URL')
            })
          }
        } else {
          if ((minLength || 0) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_URL')
              })}`
            }
          } else if ((maxLength || 2000) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 2000,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (!acceptType || acceptType === undefined) {
              if (
                data === 'http://index.html' ||
                data === 'https://index.html' ||
                data === 'http://www.com' ||
                data === 'https://www.com'
              ) {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^http|https):\\/{2})+${regex.validDomain
                      .toString()
                      .slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (data.match(regex.urlPort)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data === 'http://index.html' ||
              data === 'https://index.html' ||
              data === 'http://www.com' ||
              data === 'https://www.com'
            ) {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidURL', {
                    field: field || i18n.t('default_URL')
                  })
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('http') &&
              data.includes('http') &&
              acceptType.includes('https') &&
              data.includes('https')
            ) {
              if (data.match(regex.urlPort)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('http') &&
              data.includes('http')
            ) {
              if (data.match(regex.urlPortHTTP)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              data.includes('port') &&
              acceptType.includes('https') &&
              data.includes('https')
            ) {
              if (data.match(regex.urlPortHTTPS)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('mailto') &&
              acceptType?.includes('news')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'mailto', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('mailto')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'mailto'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('wais') &&
              acceptType?.includes('news')
            ) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (
              acceptType?.includes('mailto') &&
              acceptType?.includes('news')
            ) {
              if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['mailto', 'news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('wais')) {
              if (data.match(regex.urlWais)) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['wais'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('mailto')) {
              if (
                data.match(
                  new RegExp(
                    `((^mailto):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['mailto'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else if (acceptType?.includes('news')) {
              if (
                data.match(
                  new RegExp(
                    `((^news):)+${regex.validDomain.toString().slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                if (
                  data.match(
                    new RegExp(
                      `((^${mapType}):\\/{2})+${regex.validDomain
                        .toString()
                        .slice(1, -1)}`,
                      `gi`
                    )
                  ) && urlValidation
                ) {
                  const removeArr = acceptType.filter(
                    (item: any) => !['news'].includes(item)
                  )
                  if (
                    data.match(
                      new RegExp(
                        `((^${removeArr.join(
                          '|'
                        )}):\\/{2})+${regex.validDomain
                          .toString()
                          .slice(1, -1)}`,
                        `gi`
                      )
                    ) && urlValidation
                  ) {
                    errorStatus = {
                      status: true,
                      data: data,
                      type: type,
                      error_code: null,
                      error_message: null
                    }
                  } else {
                    errorStatus = {
                      status: false,
                      data: data,
                      type: type,
                      error_code: 'invalid',
                      error_message:
                        error ||
                        i18n.t('error_messages_invalidURL', {
                          field: field || i18n.t('default_URL')
                        })
                    }
                  }
                } else {
                  errorStatus = {
                    status: false,
                    data: data,
                    type: type,
                    error_code: 'invalid',
                    error_message:
                      error ||
                      i18n.t('error_messages_invalidURL', {
                        field: field || i18n.t('default_URL')
                      })
                  }
                }
              }
            } else {
              if (
                data.match(
                  new RegExp(
                    `((^${mapType}):\\/{2})+${regex.validDomain
                      .toString()
                      .slice(1, -1)}`,
                    `gi`
                  )
                ) && urlValidation
              ) {
                errorStatus = {
                  status: true,
                  data: data,
                  type: type,
                  error_code: null,
                  error_message: null
                }
              } else {
                errorStatus = {
                  status: false,
                  data: data,
                  type: type,
                  error_code: 'invalid',
                  error_message:
                    error ||
                    i18n.t('error_messages_invalidURL', {
                      field: field || i18n.t('default_URL')
                    })
                }
              }
            }
          }
        }
      }
      return errorStatus

    case 'country':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 2) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 2,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 3) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 3,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (
              data.match(regex.numberExp) ||
              data.match(regex.numberFullAndHalfWidth) ||
              data.match(regex.alphaExp) ||
              data.match(regex.aplhaFullAndHalfWidth) ||
              data.match(regex.numberFullWidthExp) ||
              data.match(regex.alphaFullWidthExp)
            ) {
              errorStatus = {
                status: true,
                data: data,
                type: type,
                error_code: null,
                error_message: null
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidCountryCode', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 2) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 2,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 3) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 3,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (
              data.match(regex.numberExp) ||
              data.match(regex.numberFullAndHalfWidth) ||
              data.match(regex.alphaExp) ||
              data.match(regex.aplhaFullAndHalfWidth) ||
              data.match(regex.numberFullWidthExp) ||
              data.match(regex.alphaFullWidthExp)
            ) {
              errorStatus = {
                status: true,
                data: data,
                type: type,
                error_code: null,
                error_message: null
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidCountryCode', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      }
      return errorStatus
    case 'integerDecimal':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if (data > (max || 9999999999999998)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maxValue', {
                field: field || i18n.t('default_fieldName')
              })}${max}`
            }
          } else if (data < (min || 1)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minValue', {
                field: field || i18n.t('default_fieldName')
              })}${min}`
            }
          } else if (!data.match(regex.allNumbers)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid',
              error_message: i18n.t('error_messages_format', {
                field: field || i18n.t('default_fieldName')
              })
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if (data > (max || 9999999999999998)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maxValue', {
                field: field || i18n.t('default_fieldName')
              })}${max}`
            }
          } else if (data < (min || 1)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minValue', {
                field: field || i18n.t('default_fieldName')
              })}${min}`
            }
          } else if (!data.match(regex.allNumbers)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid',
              error_message: i18n.t('error_messages_format', {
                field: field || i18n.t('default_fieldName')
              })
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      }
      return errorStatus
    case 'phone':
      if (!isRequired || isRequired === undefined) {
        if (data === '') {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 3) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength || 3,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 25) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 25,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (data.match(regex.phoneNumberFormat)) {
              errorStatus = {
                status: true,
                data: data,
                type: type,
                error_code: null,
                error_message: null
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPhoneNumber', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      } else {
        if (data === '') {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_required', {
              field: field || i18n.t('default_fieldName')
            })
          }
        } else {
          if ((minLength || 3) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else if ((maxLength || 25) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 25,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            if (data.match(regex.phoneNumberFormat)) {
              errorStatus = {
                status: true,
                data: data,
                type: type,
                error_code: null,
                error_message: null
              }
            } else {
              errorStatus = {
                status: false,
                data: data,
                type: type,
                error_code: 'invalid',
                error_message:
                  error ||
                  i18n.t('error_messages_invalidPhoneNumber', {
                    field: field || i18n.t('default_fieldName')
                  })
              }
            }
          }
        }
      }
      return errorStatus
    case 'required-date':
      if (data === '') {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_date')
          })
        }
      } else {
        const checkDate: any = moment(data, format, true).locale(
          locale || 'en_US'
        )
        if (checkDate._isValid) {
          errorStatus = {
            ...errorStatus,
            status: true,
            data: data,
            type: type
          }
        } else {
          errorStatus = {
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidDate', {
                field: field || i18n.t('default_date')
              })
          }
        }
      }
      return errorStatus
    case 'date':
      if (data !== '') {
        const checkDate: any = moment(data, format, true).locale(
          locale || 'en_US'
        )
        if (checkDate._isValid) {
          errorStatus = {
            ...errorStatus
          }
        } else {
          errorStatus = {
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidDate', {
                field: field || i18n.t('default_date')
              })
          }
        }
      } else {
        errorStatus = {
          ...errorStatus,
          status: true,
          data: data,
          type: type
        }
      }
      return errorStatus
    case 'required-time':
      if (data === '' || data === undefined) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_time')
          })
        }
      } else {
        const timeFormat =
          format === 'HH:MM:SS' ? regex.hourFormatHMS : regex.hourFormatHM
        if (data.match(timeFormat)) {
          errorStatus = {
            ...errorStatus,
            status: true,
            data: data,
            type: type
          }
        } else {
          errorStatus = {
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidTime', {
                field: field || i18n.t('default_time')
              })
          }
        }
      }
      return errorStatus
    case 'time':
      if (data !== '') {
        const timeFormat =
          format === 'HH:MM:SS' ? regex.hourFormatHMS : regex.hourFormatHM
        if (data.match(timeFormat)) {
          errorStatus = {
            ...errorStatus,
            status: true,
            data: data,
            type: type
          }
        } else {
          errorStatus = {
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidTime', {
                field: field || i18n.t('default_time')
              })
          }
        }
      }
      return errorStatus
    case 'required-time-range':
      if (
        (data.startTime === '' || data.startTime === null) &&
        (data.endTime === '' || data.endTime === null)
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_timeRange')
          })
        }
      } else if (
        data.startTime !== null &&
        (data.endTime === null || data.endTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endTimeRange', {
            field: field || i18n.t('default_timeRange')
          })
        }
      } else if (
        (data.startTime === null || data.startTime === '') &&
        data.endTime !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startTimeRange', {
            field: field || i18n.t('default_timeRange')
          })
        }
      } else {
        const checkStartTime: any = moment(data.startTime, format, true)
        const checkEndTime: any = moment(data.endTime, format, true)
        if (checkStartTime._isValid && checkEndTime._isValid) {
          if (
            moment(data.startTime).isBefore(moment(data.endTime)) &&
            (!moment(data.startTime).isSame(moment(data.endTime), 'hours') ||
              !moment(data.startTime).isSame(moment(data.endTime), 'minutes') ||
              !moment(data.startTime).isSame(moment(data.endTime), 'seconds'))
          ) {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          } else if (moment(data.startTime) === moment(data.endTime)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_timeRange', {
                field: field || i18n.t('default_timeRange')
              })
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_timeRange', {
                field: field || i18n.t('default_timeRange')
              })
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid range',
            error_message:
              error ||
              i18n.t('error_messages_invalidTimeRange', {
                field: field || i18n.t('default_timeRange')
              })
          }
        }
      }
      return errorStatus
    case 'time-range':
      if (
        (data.startTime === '' || data.startTime === null) &&
        (data.endTime === '' || data.endTime === null)
      ) {
        errorStatus = {
          ...errorStatus,
          status: true,
          data: data,
          type: type
        }
      } else if (
        data.startTime !== null &&
        (data.endTime === null || data.endTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endTimeRange', {
            field: field || i18n.t('default_timeRange')
          })
        }
      } else if (
        (data.startTime === null || data.startTime === '') &&
        data.endTime !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startTimeRange', {
            field: field || i18n.t('default_timeRange')
          })
        }
      } else {
        const checkStartTime: any = moment(data.startTime, format, true)
        const checkEndTime: any = moment(data.endTime, format, true)
        if (checkStartTime._isValid && checkEndTime._isValid) {
          if (
            moment(data.startTime).isBefore(moment(data.endTime)) &&
            (!moment(data.startTime).isSame(moment(data.endTime), 'hours') ||
              !moment(data.startTime).isSame(moment(data.endTime), 'minutes') ||
              !moment(data.startTime).isSame(moment(data.endTime), 'seconds'))
          ) {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          } else if (moment(data.startTime) === moment(data.endTime)) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_timeRange', {
                field: field || i18n.t('default_timeRange')
              })
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_timeRange', {
                field: field || i18n.t('default_timeRange')
              })
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid range',
            error_message:
              error ||
              i18n.t('error_messages_invalidTimeRange', {
                field: field || i18n.t('default_timeRange')
              })
          }
        }
      }
      return errorStatus
    case 'required-date-range':
      if (
        ((data.startDate === null || data.startDate === '') &&
          data.endDate === null) ||
        data.endDate === ''
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_dateRange')
          })
        }
      } else if (
        (data.startDate === '' ||
          data.startDate === null ||
          data.startDate === undefined) &&
        data.endDate !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startDateRange', {
            field: field || i18n.t('default_dateRange')
          })
        }
      } else if (
        (data.endDate === '' ||
          data.endDate === null ||
          data.endDate === undefined) &&
        data.startDate !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endDateRange', {
            field: field || i18n.t('default_dateRange')
          })
        }
      } else {
        const ifManualStart: any = moment(data.startDate, format, true)
        const ifManualEnd: any = moment(data.endDate, format, true)
        if (ifManualStart._isValid && ifManualEnd._isValid) {
          if (
            moment(ifManualStart._d).isBefore(moment(ifManualEnd._d)) &&
            !moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'day')
          ) {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateRange', {
                field: field || i18n.t('default_dateRange')
              })
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message: i18n.t('error_messages_invalidDateRange', {
              field: field || i18n.t('default_dateRange')
            })
          }
        }
      }
      return errorStatus
    case 'date-range':
      if (
        ((data.startDate === null || data.startDate === '') &&
          data.endDate === null) ||
        data.endDate === ''
      ) {
        errorStatus = {
          ...errorStatus,
          status: true,
          data: data,
          type: type,
          error_code: '',
          error_message: ''
        }
      } else if (
        (data.startDate === '' ||
          data.startDate === null ||
          data.startDate === undefined) &&
        data.endDate !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startDateRange', {
            field: field || i18n.t('default_dateRange')
          })
        }
      } else if (
        (data.endDate === '' ||
          data.endDate === null ||
          data.endDate === undefined) &&
        data.startDate !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endDateRange', {
            field: field || i18n.t('default_dateRange')
          })
        }
      } else {
        const ifManualStart: any = moment(data.startDate, format, true).locale(
          locale || 'en_US'
        )
        const ifManualEnd: any = moment(data.endDate, format, true).locale(
          locale || 'en_US'
        )
        if (ifManualStart._isValid && ifManualEnd._isValid) {
          if (
            moment(ifManualStart._d).isBefore(moment(ifManualEnd._d)) &&
            !moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'day')
          ) {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateRange', {
                field: field || i18n.t('default_dateRange')
              })
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message: i18n.t('error_messages_invalidDateRange', {
              field: field || i18n.t('default_dateRange')
            })
          }
        }
      }
      return errorStatus
    case 'date-time':
      if (data === '' || data === undefined) {
        errorStatus = {
          ...errorStatus,
          status: true,
          data: data,
          type: type
        }
      } else {
        const ifManual: any = moment(data, format, true).locale(
          locale || 'en_US'
        )
        if (ifManual._isValid) {
          errorStatus = {
            ...errorStatus,
            status: true,
            data: data,
            type: type
          }
        } else {
          errorStatus = {
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidDateTime', {
                field: field || i18n.t('default_dateTime')
              })
          }
        }
      }
      return errorStatus
    case 'required-date-time':
      if (data === '' || data === undefined) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_dateTime')
          })
        }
      } else {
        if (data !== '') {
          const ifManual: any = moment(data, format, true).locale(
            locale || 'en_US'
          )
          if (ifManual._isValid) {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type
            }
          } else {
            errorStatus = {
              status: false,
              data: data,
              type: type,
              error_code: 'invalid',
              error_message:
                error ||
                i18n.t('error_messages_invalidDateTime', {
                  field: field || i18n.t('default_dateTime')
                })
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: true,
            data: data,
            type: type
          }
        }
      }
      return errorStatus
    case 'required-date-time-range':
      if (
        (data.startDateTime === null || data.startDateTime === '') &&
        (data.endDateTime === null || data.endDateTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'empty',
          error_message: i18n.t('error_messages_required', {
            field: field || i18n.t('default_dateTimeRange')
          })
        }
      } else if (
        (data.startDateTime === null || data.startDateTime === '') &&
        data.endDateTime !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startDateTimeRange', {
            field: field || i18n.t('default_dateTimeRange')
          })
        }
      } else if (
        data.startDateTime !== null &&
        (data.endDateTime === null || data.endDateTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endDateTimeRange', {
            field: field || i18n.t('default_dateTimeRange')
          })
        }
      } else {
        const ifManualStart: any = moment(
          data.startDateTime,
          format,
          true
        ).locale(locale || 'en_US')
        const ifManualEnd: any = moment(data.endDateTime, format, true).locale(
          locale || 'en_US'
        )
        if (ifManualStart._isValid && ifManualEnd._isValid) {
          if (ifManualStart >= ifManualEnd) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
            }
          } else if (
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'day') ||
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'hours') ||
            moment(ifManualStart._d).isSame(
              moment(ifManualEnd._d),
              'minutes'
            ) ||
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'seconds')
          ) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidDateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
          }
        }
      }
      return errorStatus
    case 'date-time-range':
      if (
        (data.startDateTime === null || data.startDateTime === '') &&
        (data.endDateTime === null || data.endDateTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: true,
          data: data,
          type: type,
          error_code: '',
          error_message: ''
        }
      } else if (
        (data.startDateTime === null || data.startDateTime === '') &&
        data.endDateTime !== null
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_startDateTimeRange', {
            field: field || i18n.t('default_dateTimeRange')
          })
        }
      } else if (
        data.startDateTime !== null &&
        (data.endDateTime === null || data.endDateTime === '')
      ) {
        errorStatus = {
          ...errorStatus,
          status: false,
          data: data,
          type: type,
          error_code: 'invalid range',
          error_message: i18n.t('error_messages_endDateTimeRange', {
            field: field || i18n.t('default_dateTimeRange')
          })
        }
      } else {
        const ifManualStart: any = moment(
          data.startDateTime,
          format,
          true
        ).locale(locale || 'en_US')
        const ifManualEnd: any = moment(data.endDateTime, format, true).locale(
          locale || 'en_US'
        )
        if (ifManualStart._isValid && ifManualEnd._isValid) {
          if (ifManualStart > ifManualEnd) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
            }
          } else if (
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'day') ||
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'hours') ||
            moment(ifManualStart._d).isSame(
              moment(ifManualEnd._d),
              'minutes'
            ) ||
            moment(ifManualStart._d).isSame(moment(ifManualEnd._d), 'seconds')
          ) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid range',
              error_message: i18n.t('error_messages_dateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
            }
          } else {
            errorStatus = {
              ...errorStatus,
              status: true,
              data: data,
              type: type,
              error_code: '',
              error_message: ''
            }
          }
        } else {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'invalid',
            error_message:
              error ||
              i18n.t('error_messages_invalidDateTimeRange', {
                field: field || i18n.t('default_dateTimeRange')
              })
          }
        }
      }
      return errorStatus
    case 'select':
      if (!isRequired || isRequired === undefined) {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            status: true,
            data: data,
            type: type,
            error_code: null,
            error_message: null
          }
        } else {
          if ((minLength || 0) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_select')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      } else {
        if (
          data === '' ||
          data === null ||
          data?.length === 0 ||
          data === undefined
        ) {
          errorStatus = {
            ...errorStatus,
            status: false,
            data: data,
            type: type,
            error_code: 'empty',
            error_message: i18n.t('error_messages_selectInput', {
              field: field || i18n.t('default_select')
            })
          }
        } else {
          if ((minLength || 0) > data.length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_minimum', {
                min: minLength,
                field: field || i18n.t('default_select')
              })}`
            }
          } else if ((maxLength || 100) < emojiCount(data).length) {
            errorStatus = {
              ...errorStatus,
              status: false,
              data: data,
              type: type,
              error_code: 'invalid length',
              error_message: `${i18n.t('error_messages_maximum', {
                max: maxLength || 100,
                field: field || i18n.t('default_fieldName')
              })}`
            }
          } else {
            errorStatus = {
              status: true,
              data: data,
              type: type,
              error_code: null,
              error_message: null
            }
          }
        }
      }
      return errorStatus
    default:
      return errorStatus
  }
}

export const validator = (value: any) => {
  let result: any = []
  const checkIfMultiple = Array.isArray(value)
  if (checkIfMultiple) {
    result = value.map((item) => {
      return validate({
        type: item.type,
        data: item.data,
        minLength: item.minLength,
        maxLength: item.maxLength,
        isRequired: item.isRequired,
        min: item.min,
        max: item.max,
        error: item.error,
        format: item.format,
        locale: item.locale,
        field: item.field,
        acceptType: item.acceptType
      })
    })

    const toBeStatus = result.map((item) => item.status)
    const getOneStatus = (prev, next) => prev && next
    const statusValue = toBeStatus.reduce(getOneStatus)
    const resultStatus: ReturnStatusType = {
      status: statusValue,
      data: result
    }
    return resultStatus
  } else {
    result = validate({
      type: value.type,
      data: value.data,
      minLength: value.minLength,
      maxLength: value.maxLength,
      isRequired: value.isRequired,
      min: value.min,
      max: value.max,
      error: value.error,
      format: value.format,
      locale: value.locale,
      field: value.field,
      acceptType: value.acceptType
    })
    return result
  }
}
