import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsUUID } from "class-validator"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("FilterGetSubscriptionsDto"))
export class FilterGetSubscriptionsDto {
  @Field()
  @IsUUID(4, { each: true })
  @Expose()
  ids: string[]
}
