import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as dayjs from "dayjs"
import * as customParseFormat from "dayjs/plugin/customParseFormat"
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import * as timezone from "dayjs/plugin/timezone"
import * as utc from "dayjs/plugin/utc"

import { AppModule } from "./app.module"
import { cors } from "./common/security/cors.sec"
import { applyGlobalSettings } from "./common/setting"
import { monitorNodeUnhandledError } from "./common/utils/nodeErrorMonitor.util"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "./providers/config/global.config"

async function bootstrap() {
  monitorNodeUnhandledError()

  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter)

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
    Logger.log(`🚀 BBA service starts in ${config.STAGE} stage in ${config.NODE_ENV} mode`, "main.bootstrap")
    Logger.log(`🚀 BBA restful endpoint ${url}`, "main.bootstrap")
    Logger.log(`🚀 BBA graphql endpoint ${url}${config.GRAPHQL_PATH}`, "main.bootstrap")
  })
}

bootstrap()
