import { isDate, isDateString, isNumber } from "class-validator"

/**
 *
 * @param v ISO string, unix number (milliseconds), or Date object
 * @returns Date object
 */
export const fromAnyToDateOrUndefined = (v: unknown) => {
  if (v === null) {
    return null
  }

  if (v === undefined) {
    return undefined
  }

  if (isDateString(v)) {
    return new Date(v as string)
  }

  // must be milliseconds
  if (isNumber(v)) {
    return new Date(v)
  }

  if (isDate(v)) {
    return v
  }

  return undefined
}
