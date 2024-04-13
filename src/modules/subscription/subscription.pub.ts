import { Injectable } from "@nestjs/common"
import { ClsService } from "nestjs-cls"

import { ContextStore } from "../../common/interface/contextStore.interface"
import { EventPublisher } from "../../providers/event/base.publisher"
import { SubscriptionEntity } from "./entity/subscription.entity"

@Injectable()
export class SubscriptionEventPublisher {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly clsService: ClsService<ContextStore>
  ) {}

  async publishPolicyCreatedEvent(entity: SubscriptionEntity): Promise<void> {
    // const context = this.clsService.get("context") as Context
    // const payload: IdpPolicyCreateCompletedEventPayload = {
    //   eventId: v4(),
    //   masterId: entity.id,
    //   policy: {
    //     ...entity,
    //     createdAt: entity.createdAt.toISOString(),
    //     updatedAt: entity.updatedAt.toISOString()
    //   }
    // }
    // await this.eventPublisher.publish<createPolicy["schemas"]["IdpPolicyCreatedEvent"]["detail-type"]>(
    //   "IDP_POLICY_CREATE_COMPLETED",
    //   JSON.stringify(payload)
    // )
  }

  async publishPolicyUpdatedEvent(data: {
    updated: SubscriptionEntity
    fieldsUpdated: Partial<SubscriptionEntity>
  }): Promise<void> {
    // // TODO: update event schema to include fieldsUpdated
    // const { updated: entity, fieldsUpdated } = data
    // const context = this.clsService.get("context") as Context
    // const payload: IdpPolicyCreateCompletedEventPayload = {
    //   eventId: v4(),
    //   masterId: entity.id,
    //   policy: {
    //     ...entity,
    //     createdAt: entity.createdAt.toISOString(),
    //     updatedAt: entity.updatedAt.toISOString()
    //   }
    // }
    // await this.eventPublisher.publish<updatePolicy["schemas"]["IdpPolicyUpdatedEvent"]["detail-type"]>(
    //   "IDP_POLICY_UPDATE_COMPLETED",
    //   JSON.stringify(payload)
    // )
  }

  async publishPolicyDeleteEvent(entity: SubscriptionEntity): Promise<void> {
    // const context = this.clsService.get("context") as Context
    // const payload: IdpPolicyCreateCompletedEventPayload = {
    //   eventId: v4(),
    //   masterId: entity.id,
    //   policy: {
    //     ...entity,
    //     createdAt: entity.createdAt.toISOString(),
    //     updatedAt: entity.updatedAt.toISOString()
    //   }
    // }
    // await this.eventPublisher.publish<deletePolicy["schemas"]["IdpPolicyDeletedEvent"]["detail-type"]>(
    //   "IDP_POLICY_DELETE_COMPLETED",
    //   JSON.stringify(payload)
    // )
  }
}
