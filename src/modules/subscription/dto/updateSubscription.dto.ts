import { Field, InputType } from "@nestjs/graphql"
import { Expose, Type } from "class-transformer"
import { ArrayMaxSize, IsBoolean, IsEnum, IsOptional, Max, Min, ValidateNested } from "class-validator"

import { TagDto } from "../../../common/dto/tag.dto"
import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"
import { COURT_ENUM } from "../enum/court.enum"

@InputType(buildGqlNameWithPrefix("UpdateSubscriptionDto"))
export class UpdateSubscriptionDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(COURT_ENUM)
  @Expose()
  court?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @Expose()
  enableEmail?: boolean

  @Field({ nullable: true })
  @IsOptional()
  @Min(15)
  @Max(24 * 7 * 60)
  @Expose()
  interval?: number

  @Field({ nullable: true })
  @IsOptional()
  @Expose()
  lastEmailSentAt?: Date

  @Field(() => [TagDto], { nullable: true })
  @IsOptional()
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @Expose()
  tags?: TagDto[]
}
