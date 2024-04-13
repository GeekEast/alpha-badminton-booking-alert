import { ArgumentMetadata, BadRequestException, InternalServerErrorException, ValidationPipe } from "@nestjs/common"
import { isNil, omit, pickBy } from "lodash"

export class AtLeastNFieldsValidator extends ValidationPipe {
  _n: number
  _excludes?: string[]

  constructor(options: { n: number; excludes?: string[] }) {
    super()
    this._n = options.n
    if (this._n <= 0) {
      throw new InternalServerErrorException("n should be greater than 0 for AtLeastNFieldValidator")
    }
    this._excludes = options?.excludes ?? []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async transform(payload: any, _metadata: ArgumentMetadata): Promise<unknown> {
    if (Object.keys(pickBy(omit(payload, this._excludes), (value) => !isNil(value))).length < this._n) {
      throw new BadRequestException(`should provide at least ${this._n} field(s)`)
    }
    return payload
  }
}
