import { Global, Module } from "@nestjs/common"

import { globalConfigProvider } from "./global.config"

@Global()
@Module({
  providers: [globalConfigProvider],
  exports: [globalConfigProvider]
})
export class ConfigModule {}
