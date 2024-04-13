import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from "@apollo/server/plugin/landingPage/default"

import { GLOBAL_CONFIG } from "../../../providers/config/global.config"

export const generatePlaygroundPlugin = (config: typeof GLOBAL_CONFIG) => {
  if (config.IS_OFFLINE || config.IS_DEV || config.IS_QA) {
    return ApolloServerPluginLandingPageLocalDefault()
  }
  return ApolloServerPluginLandingPageProductionDefault()
}
