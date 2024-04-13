import { BadRequestException, Injectable, InternalServerErrorException, PipeTransform } from "@nestjs/common"
import { isNil, omit, pickBy } from "lodash"

@Injectable()
export class AtLeastNFieldsValidationPipe implements PipeTransform {
  constructor(
    private readonly n: number,
    private readonly excludes: string[] = []
  ) {}

  transform(value) {
    if (this.n <= 0) {
      throw new InternalServerErrorException("n should be greater than 0 for AtLeastNFieldsValidator")
    }

    if (Object.keys(pickBy(omit(value, this.excludes), (value) => !isNil(value))).length < this.n) {
      if (this.excludes.length !== 0) {
        throw new BadRequestException(
          `should provide at least ${this.n} field(s) excluding [${this.excludes.join(", ")}] field(s)`
        )
      }
      throw new BadRequestException(`should provide at least ${this.n} field(s)`)
    }
    return value
  }
}
