import { NestFactory } from "@nestjs/core"
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql"
import * as fs from "fs"
import { printSchema } from "graphql"
import * as path from "path"

import { GraphQLResolvers } from "../../modules"

async function emitSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule, { logger: false })
  await app.init()

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
  const schema = await gqlSchemaFactory.create(GraphQLResolvers)
  fs.writeFileSync(path.join(process.cwd(), "schema.gql"), printSchema(schema))
}

emitSchema()
