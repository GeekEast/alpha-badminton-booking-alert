import { Field, ObjectType } from "@nestjs/graphql"
import { Exclude, Expose, Transform, Type } from "class-transformer"
import { IsUUID } from "class-validator"

import { TagEntity } from "../../../common/entity/tag.entity"
import { buildGqlNameWithPrefix } from "../../../common/utils/buildGqlName.util"
import { fromAnyToDateOrUndefined } from "../../../common/utils/fromAnyToDateOrUndefined.util"
import { UserEntity } from "./user.entity"

@ObjectType(buildGqlNameWithPrefix("SubscriptionEntity"))
export class SubscriptionEntity {
  @Field()
  @Expose()
  @IsUUID()
  id: string

  @Field()
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.start))
  @Expose()
  start: Date

  @Field()
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.end))
  @Expose()
  end: Date

  @Field(() => UserEntity)
  @Type(() => UserEntity)
  @Expose()
  user: UserEntity

  @Field({ nullable: true })
  // just for readability
  // @IsEnum(COURT_ENUM)
  @Expose()
  court?: string

  @Field()
  @Expose()
  enableEmail: boolean

  @Field({ nullable: true })
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.lastEmailSentAt))
  @Expose()
  lastEmailSentAt: Date

  @Field()
  @Expose()
  interval: number

  @Field()
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.createdAt))
  @Expose()
  createdAt: Date

  @Field()
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.updatedAt))
  @Expose()
  updatedAt: Date

  @Field({ nullable: true })
  @Transform(({ obj }) => fromAnyToDateOrUndefined(obj.archivedAt))
  @Expose()
  archivedAt?: Date

  @Field(() => [TagEntity])
  @Transform(({ obj }) => obj.tags ?? [])
  @Type(() => TagEntity)
  @Expose()
  tags: TagEntity[]

  // * ========================== EXCLUDE ==========================
  @Exclude()
  PK?: string
}
