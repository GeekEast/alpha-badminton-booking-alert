import { Field, InputType } from "@nestjs/graphql"
import { Expose, Transform, Type } from "class-transformer"
import { ArrayMaxSize, IsDate, ValidateNested } from "class-validator"

import { TagDto } from "../../../common/dto/tag.dto"
import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"
import { AddUserDto } from "./addUser.dto"

@InputType(buildGqlNameWithPrefix("AddSubscriptionDto"))
export class AddSubscriptionDto {
  @Field()
  @Transform(({ obj }) => {
    return new Date(obj.start)
  })
  @IsDate()
  @Expose()
  start: Date

  @Field()
  @Transform(({ obj }) => {
    return new Date(obj.start)
  })
  @IsDate()
  @Expose()
  end: Date

  @Field(() => AddUserDto)
  @ValidateNested()
  @Type(() => AddUserDto)
  @Expose()
  user: AddUserDto

  @Field(() => [TagDto], { nullable: true })
  @Transform(({ obj }) => obj.tags ?? [])
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @Expose()
  tags: TagDto[]
}
