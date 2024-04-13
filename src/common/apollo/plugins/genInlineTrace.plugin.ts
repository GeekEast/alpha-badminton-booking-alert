import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled"
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace"

import { GLOBAL_CONFIG } from "../../../providers/config/global.config"

export const generateInlineTracePlugin = (config: typeof GLOBAL_CONFIG) => {
  if (config.IS_OFFLINE) {
    return ApolloServerPluginInlineTraceDisabled()
  }
  return ApolloServerPluginInlineTrace()
}
