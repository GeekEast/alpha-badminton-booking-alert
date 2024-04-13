/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, Type } from "@nestjs/common"
import { ErrorHttpStatusCode } from "@nestjs/common/utils/http-error-by-code.util"
import { ClassTransformOptions, plainToInstance } from "class-transformer"
import { validateSync, ValidatorOptions } from "class-validator"
import { isNil } from "lodash"

import { createExceptionFactory } from "./createExtension.factory"

export interface InstantiatePipeOptions extends ValidatorOptions {
  validate?: boolean
  transformOptions?: ClassTransformOptions
  errorHttpStatusCode?: ErrorHttpStatusCode
}

export const instantiate = <T extends object = any>(
  value: any,
  metatype: Type<T>, // The class
  options?: InstantiatePipeOptions
) => {
  if (isNil(value)) {
    return null
  }

  options = options || {}
  const {
    validate = false,
    errorHttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    transformOptions,
    ...originalValidatorOptions
  } = options

  // transformation
  const entity = plainToInstance<T, any>(metatype, value, {
    // ! no need add @Expose() decorator to all properties,
    // * but it's still required to add @Expose() decorator for nested properties
    // so make sure add @Expose() to every field for best safety
    excludeExtraneousValues: false,
    // ! must be true
    // * use @Exclude to delete unnecessary fields
    exposeUnsetFields: true,
    ...transformOptions
  })

  if (validate) {
    const validatorOptions = {
      forbidUnknownValues: false,
      ...originalValidatorOptions
    }

    const errors = validateSync(entity, validatorOptions)
    if (errors.length > 0) {
      throw createExceptionFactory(errorHttpStatusCode)(errors)
    }
  }

  return entity
}
