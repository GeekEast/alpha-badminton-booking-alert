import { Field, ObjectType } from "@nestjs/graphql"
import { Expose } from "class-transformer"

import { buildGqlNameWithPrefix } from "../utils/buildGqlName.util"

@ObjectType(buildGqlNameWithPrefix("TagEntity"))
export class TagEntity {
  @Field()
  @Expose()
  name: string

  @Field()
  @Expose()
  value: string
}
