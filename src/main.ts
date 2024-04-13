import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"
import { cors } from "./common/security/cors.sec"
import { applyGlobalSettings } from "./common/setting"
import { monitorNodeUnhandledError } from "./common/utils/nodeErrorMonitor.util"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "./providers/config/global.config"

async function bootstrap() {
  monitorNodeUnhandledError()

  const app = await NestFactory.create(AppModule, {
    cors,
    // for logger
    bufferLogs: true,
    // for nest dev tools
    snapshot: true
  })

  await applyGlobalSettings(app)

  const config = app.get<typeof GLOBAL_CONFIG>(GLOBAL_CONFIG_PROVIDER)
  await app.listen(config.PORT, async () => {
    const url = await app.getUrl()
    Logger.log(`🚀 LI service starts in ${config.STAGE} stage in ${config.NODE_ENV} mode`, "main.bootstrap")
    Logger.log(`🚀 LI restful endpoint ${url}`, "main.bootstrap")
    Logger.log(`🚀 LI graphql endpoint ${url}${config.GRAPHQL_PATH}`, "main.bootstrap")
  })
}

bootstrap()
