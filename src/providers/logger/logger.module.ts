import { Global, Module, Provider } from "@nestjs/common"
import { ClsModule, ClsService } from "nestjs-cls"

import { ContextStore } from "../../common/interface/contextStore.interface"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../config/global.config"
import { Logger } from "./logger.service"

const provider: Provider = {
  provide: Logger,
  useFactory: async (clsService: ClsService<ContextStore>, config: typeof GLOBAL_CONFIG) =>
    new Logger(null, { logLevels: config.LOG_LEVELS }, clsService, config),
  inject: [ClsService<ContextStore>, GLOBAL_CONFIG_PROVIDER]
}

@Global()
@Module({
  imports: [ClsModule],
  providers: [provider],
  exports: [provider]
})
export class LoggerModule {}
