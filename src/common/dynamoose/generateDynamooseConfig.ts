import { DynamooseModuleOptions } from "nestjs-dynamoose"

import { GLOBAL_CONFIG } from "../../providers/config/global.config"

export const generateDynamooseConfig = (config: typeof GLOBAL_CONFIG): DynamooseModuleOptions => {
  if (config.IS_OFFLINE) {
    return {
      local: config.DYNAMO_ENDPOINT,
      aws: {
        accessKeyId: "LOCAL",
        secretAccessKey: "LOCAL",
        region: config.REGION
      }
    }
  }

  return {
    local: false
  }
}
