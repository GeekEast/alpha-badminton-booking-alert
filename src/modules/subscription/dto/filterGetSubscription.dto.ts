import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsUUID } from "class-validator"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("FilterGetSubscriptionDto"))
export class FilterGetSubscriptionDto {
  @Field()
  @IsUUID()
  @Expose()
  id: string
}
