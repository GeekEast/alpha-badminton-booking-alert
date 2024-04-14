import { Field, ObjectType } from "@nestjs/graphql"
import { Expose } from "class-transformer"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@ObjectType(buildGqlNameWithPrefix("UserEntity"))
export class UserEntity {
  @Field()
  @Expose()
  firstName: string

  @Field()
  @Expose()
  lastName: string

  @Field()
  @Expose()
  email: string

  @Field()
  @Expose()
  timezone: string
}
