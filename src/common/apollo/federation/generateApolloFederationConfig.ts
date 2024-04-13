import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled"
import { ApolloFederationDriverConfig } from "@nestjs/apollo"
import { ClsService } from "nestjs-cls"

import { GLOBAL_CONFIG } from "../../../providers/config/global.config"
import { ContextStore } from "../../interface/contextStore.interface"
import { generateInlineTracePlugin } from "../plugins/genInlineTrace.plugin"
import { generatePlaygroundPlugin } from "../plugins/genPlayground.plugin"

export const generateApolloFederationConfig = (
  _clsService: ClsService<ContextStore>,
  config: typeof GLOBAL_CONFIG
): Promise<ApolloFederationDriverConfig> | ApolloFederationDriverConfig => ({
  introspection: config.IS_LOCAL || config.IS_DEV || config.IS_QA,
  directiveResolvers: true,
  path: config.GRAPHQL_PATH,
  autoTransformHttpErrors: true,
  autoSchemaFile: { federation: 2, path: "schema.gql" }, // ! must use federation version 2
  allowBatchedHttpRequests: false,
  context: ({ req, res }) => ({ req, res }),
  playground: false, // will be enabled in generatePlaygroundPlugin()
  plugins: [generateInlineTracePlugin(config), generatePlaygroundPlugin(config)]
})

export const generateApolloFederationConfigForTesting = ():
  | Promise<ApolloFederationDriverConfig>
  | ApolloFederationDriverConfig => ({
  introspection: false,
  directiveResolvers: true,
  path: GLOBAL_CONFIG.GRAPHQL_PATH,
  autoTransformHttpErrors: true,
  autoSchemaFile: { federation: 2, path: "schema.gql" }, // ! must use federation version 2
  allowBatchedHttpRequests: false,
  context: ({ req, res }) => ({ req, res }),
  playground: false,
  plugins: [ApolloServerPluginInlineTraceDisabled()]
})
