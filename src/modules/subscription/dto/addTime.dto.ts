import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsNumber, Max, Min } from "class-validator"
import * as dayjs from "dayjs"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("AddTimeDto"))
export class AddTimeDto {
  @Field()
  @IsNumber()
  @Min(dayjs().year())
  @Max(9999)
  @Expose()
  year: number

  @Field()
  @IsNumber()
  @Min(1)
  @Max(12)
  @Expose()
  month: number

  @Field()
  @IsNumber()
  @Min(1)
  @Max(31)
  @Expose()
  day: number

  @Field()
  @IsNumber()
  @Min(0)
  @Max(23)
  @Expose()
  hour: number

  // default value should happen in earlier stage
  @Field({ defaultValue: 0 })
  @IsNumber()
  @Min(0)
  @Max(59)
  @Expose()
  minute: number
}
