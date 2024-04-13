import { MongooseModuleOptions } from "@nestjs/mongoose"

import { GLOBAL_CONFIG } from "../../providers/config/global.config"

export const generateMongoosePrimaryConfig = (
  config: typeof GLOBAL_CONFIG,
  username?: string,
  password?: string
): MongooseModuleOptions => {
  if (config.IS_OFFLINE) {
    return {
      uri: config.LOCAL_DOCUMENTDB_PRIMARY_ENDPOINT,
      dbName: config.DOCUMENTDB_DBNAME,
      retryWrites: false,
      autoIndex: false,
      // this is important to connect successfully to the local mongodb
      directConnection: true,
      user: username,
      pass: password
    }
  }

  return {
    uri: config.DOCUMENTDB_ENDPOINT,
    dbName: config.DOCUMENTDB_DBNAME,
    user: username,
    pass: password
  }
}

export const generateMongooseSecondaryConfig = (
  config: typeof GLOBAL_CONFIG,
  username: string,
  password: string
): MongooseModuleOptions => {
  if (config.IS_OFFLINE) {
    return {
      uri: config.LOCAL_DOCUMENTDB_SECONDARY_ENDPOINT,
      dbName: config.DOCUMENTDB_DBNAME,
      readPreference: "secondaryPreferred",
      autoIndex: false,
      // this is important to connect successfully to the local mongodb
      directConnection: true,
      user: username,
      pass: password
    }
  }

  return {
    uri: config.DOCUMENTDB_ENDPOINT,
    dbName: config.DOCUMENTDB_DBNAME,
    user: username,
    pass: password
  }
}
