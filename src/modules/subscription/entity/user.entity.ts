import { Field, ObjectType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsEmail, MaxLength } from "class-validator"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@ObjectType(buildGqlNameWithPrefix("UserEntity"))
export class UserEntity {
  @Field()
  @MaxLength(50)
  @Expose()
  firstName: string

  @Field()
  @MaxLength(50)
  @Expose()
  lastName: string

  @Field()
  @IsEmail()
  @Expose()
  email: string
}
