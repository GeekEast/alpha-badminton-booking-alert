import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsOptional, IsUUID } from "class-validator"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("FilterGetSubscriptionsDto"))
export class FilterGetSubscriptionsDto {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsUUID(4, { each: true })
  @Expose()
  ids?: string[]
}
