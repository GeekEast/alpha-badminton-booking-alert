import { DynamooseModuleOptions } from "nestjs-dynamoose"

import { GLOBAL_CONFIG } from "../../providers/config/global.config"

export const generateDynamooseConfig = (config: typeof GLOBAL_CONFIG): DynamooseModuleOptions => {
  if (config.IS_OFFLINE) {
    return {
      local: config.DYNAMO_ENDPOINT,
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: config.REGION
      }
    }
  }

  return {
    local: false
  }
}
