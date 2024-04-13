import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge"
import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common"
import { ClsService } from "nestjs-cls"

import { ContextStore } from "../../common/interface/contextStore.interface"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../config/global.config"

@Injectable()
export class EventPublisher {
  logger = new Logger(EventPublisher.name)

  constructor(
    private readonly client: EventBridgeClient,
    @Inject(GLOBAL_CONFIG_PROVIDER) private readonly config: typeof GLOBAL_CONFIG,
    private readonly clsService: ClsService<ContextStore>
  ) {}

  async publish<EventType extends string>(type: EventType, payload: string) {
    const commands = new PutEventsCommand({
      Entries: [
        {
          EventBusName: this.config.EVENT_BUS_NAME,
          Source: this.config.EVENT_BUS_SOURCE,
          DetailType: type,
          Detail: payload
        }
      ]
    })

    try {
      await this.client.send(commands)
      this.logger.log({
        message: `event has been sent successfully from ${this.config.SERVICE_NAME}`,
        eventType: type,
        payload
      })
    } catch (error) {
      throw new InternalServerErrorException(`fail to send event to eventBridge`, {
        cause: error?.response.data || error
      })
    }
  }
}
