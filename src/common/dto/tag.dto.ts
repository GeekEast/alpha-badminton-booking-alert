import { Field, InputType } from "@nestjs/graphql"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

import { buildGqlNameWithPrefix } from "../utils/buildGqlName.util"

@InputType(buildGqlNameWithPrefix("TagDto"))
export class TagDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  name: string

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Expose()
  value: string
}
