import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsEmail, IsTimeZone, MaxLength } from "class-validator"

import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("AddUserDto"))
export class AddUserDto {
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

  @Field()
  @IsTimeZone()
  @Expose()
  timezone: string
}
