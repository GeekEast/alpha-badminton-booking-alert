import { EventBridgeClient } from "@aws-sdk/client-eventbridge"
import { Global, Module } from "@nestjs/common"

import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../config/global.config"
import { EventPublisher } from "./base.publisher"

const EventBridgeClientProvider = {
  provide: EventBridgeClient,
  useFactory: (config: typeof GLOBAL_CONFIG) => {
    return config.IS_ONLINE
      ? new EventBridgeClient({ region: config.REGION })
      : new EventBridgeClient({
          region: config.REGION,
          endpoint: config.OFFLINE_EVENT_BUS_ENDPOINT,
          credentials: { accessKeyId: "local", secretAccessKey: "local" }
        })
  },
  inject: [GLOBAL_CONFIG_PROVIDER]
}

@Global()
@Module({
  providers: [EventPublisher, EventBridgeClientProvider],
  exports: [EventPublisher]
})
export class EventBaseModule {}
