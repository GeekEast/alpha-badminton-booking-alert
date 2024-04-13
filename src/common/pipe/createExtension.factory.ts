import { ErrorHttpStatusCode, HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util"
import { ValidationError } from "class-validator"
import { iterate } from "iterare"

export const mapChildrenToValidationErrors = (error: ValidationError, parentPath?: string): ValidationError[] => {
  if (!(error.children && error.children.length)) {
    return [error]
  }
  const validationErrors = []
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath))
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item))
  }
  return validationErrors
}

export const prependConstraintsWithParentProp = (parentPath: string, error: ValidationError): ValidationError => {
  const constraints = {}
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`
  }
  return {
    ...error,
    constraints
  }
}

export const createExceptionFactory = (errorHttpStatusCode: ErrorHttpStatusCode) => {
  return (validationErrors: ValidationError[]) => {
    const errors = flattenValidationErrors(validationErrors)
    return new HttpErrorByCode[errorHttpStatusCode](errors)
  }
}

export const flattenValidationErrors = (validationErrors: ValidationError[]): string[] => {
  return iterate(validationErrors)
    .map((error) => mapChildrenToValidationErrors(error))
    .flatten()
    .filter((item) => !!item.constraints)
    .map((item) => Object.values(item.constraints))
    .flatten()
    .toArray()
}
