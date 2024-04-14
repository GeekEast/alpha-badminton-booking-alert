import { Field, InputType } from "@nestjs/graphql"
import { Expose, Transform, Type } from "class-transformer"
import { ArrayMaxSize, IsBoolean, IsEnum, IsNumber, IsOptional, Max, Min, ValidateNested } from "class-validator"
import * as dayjs from "dayjs"

import { TagDto } from "../../../common/dto/tag.dto"
import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"
import { COURT_ENUM } from "../enum/court.enum"
import { AddUserDto } from "./addUser.dto"

@InputType(buildGqlNameWithPrefix("AddSubscriptionDto"))
export class AddSubscriptionDto {
  @Field()
  @IsNumber()
  @Min(dayjs().year())
  @Max(9999)
  @Expose()
  year: number

  @Field()
  @IsNumber()
  @Min(1)
  @Max(12)
  @Expose()
  month: number

  @Field()
  @IsNumber()
  @Min(1)
  @Max(31)
  @Expose()
  day: number

  @Field()
  @IsNumber()
  @Min(0)
  @Max(23)
  @Expose()
  startHour: number

  @Field()
  @IsNumber()
  @Min(0)
  @Max(23)
  @Expose()
  endHour: number

  @Transform(({ obj }: { obj: AddSubscriptionDto }) => {
    const timeStr = `${obj.year}-${obj.month}-${obj.day} ${obj.startHour}`
    const timeFormat = "YYYY-M-D H"
    return dayjs.tz(timeStr, timeFormat, obj.user.timezone).toDate()
  })
  @Expose()
  start: Date

  @Transform(({ obj }: { obj: AddSubscriptionDto }) => {
    const timeStr = `${obj.year}-${obj.month}-${obj.day} ${obj.endHour}`
    const timeFormat = "YYYY-M-D H"
    return dayjs.tz(timeStr, timeFormat, obj.user.timezone).toDate()
  })
  @Expose()
  end: Date

  @Field(() => AddUserDto)
  @ValidateNested()
  @Type(() => AddUserDto)
  @Expose()
  user: AddUserDto

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(COURT_ENUM)
  @Expose()
  court?: string

  @Field()
  @Transform(({ obj }) => obj.enableEmail ?? true)
  @IsBoolean()
  @Expose()
  enableEmail: boolean

  @Field({ nullable: true })
  @Transform(({ obj }) => obj.interval ?? 30)
  @Min(15)
  @Max(24 * 7 * 60)
  @Expose()
  interval: number

  @Field(() => [TagDto], { nullable: true })
  @Transform(({ obj }) => obj.tags ?? [])
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @Expose()
  tags: TagDto[]
}
