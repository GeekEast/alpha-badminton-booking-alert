/* eslint-disable @typescript-eslint/no-explicit-any */
import deepEqual from "deep-equal"
import prettyjson from "prettyjson"

beforeEach(() => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
})

expect.extend({
  toHaveBeenCalledWithInclude(f: jest.Mock<any, any>, ...args: any[]): jest.CustomMatcherResult {
    const include = f.mock.calls.some((s: any[]) => deepEqual(s, args))
    if (include) {
      return { message: () => "", pass: true }
    }

    const message = `
      ${f.name} has been called with 
      ${prettyjson.render(f.mock.calls)}

      expected include 
      ${prettyjson.render(args)}
    `
    return { message: () => message, pass: false }
  }
})
