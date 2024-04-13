import { Field, InputType } from "@nestjs/graphql"
import { Expose, Transform, Type } from "class-transformer"
import { ArrayMaxSize, IsDate, IsOptional, ValidateNested } from "class-validator"

import { TagDto } from "../../../common/dto/tag.dto"
import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"
import { AddUserDto } from "./addUser.dto"

@InputType(buildGqlNameWithPrefix("UpdateSubscriptionDto"))
export class UpdateSubscriptionDto {
  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ obj }) => {
    return new Date(obj.start)
  })
  @IsDate()
  @Expose()
  start?: string

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ obj }) => {
    return new Date(obj.start)
  })
  @IsDate()
  @Expose()
  end?: string

  @Field(() => AddUserDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddUserDto)
  @Expose()
  user?: AddUserDto

  @Field(() => [TagDto], { nullable: true })
  @Transform(({ obj }) => obj.tags ?? [])
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @Expose()
  tags: TagDto[]
}
