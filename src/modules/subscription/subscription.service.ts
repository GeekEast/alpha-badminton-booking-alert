import { Injectable } from "@nestjs/common"
import { v4 as uuid } from "uuid"

import { instantiate } from "../../common/pipe/instantiate.pipe"
import { AddSubscriptionDto } from "./dto/addSubscription.dto"
import { FilterGetSubscriptionDto } from "./dto/filterGetSubscription.dto"
import { FilterGetSubscriptionsDto } from "./dto/filterGetSubscriptions.dto"
import { UpdateSubscriptionDto } from "./dto/updateSubscription.dto"
import { SubscriptionEntity } from "./entity/subscription.entity"
import { SubscriptionEventPublisher } from "./subscription.pub"
import { SubscriptionRepo } from "./subscription.repo"

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepo: SubscriptionRepo,
    private readonly subscriptionEventPublisher: SubscriptionEventPublisher
  ) {}

  async createSubscription(addSubscriptionDto: AddSubscriptionDto): Promise<SubscriptionEntity> {
    const object = await this.subscriptionRepo.createSubscription({
      id: uuid(),
      start: addSubscriptionDto.start,
      end: addSubscriptionDto.end,
      user: { ...addSubscriptionDto.user },
      court: addSubscriptionDto.court,
      enableEmail: addSubscriptionDto.enableEmail,
      interval: addSubscriptionDto.interval,
      tags: addSubscriptionDto.tags
    })

    return instantiate({ id: object.PK, ...object }, SubscriptionEntity)
  }

  async updateSubscription(
    filterUpdateSubscriptionDto: FilterGetSubscriptionDto,
    updateSubscriptionDto: UpdateSubscriptionDto
  ): Promise<SubscriptionEntity> {
    const response = await this.subscriptionRepo.updateActiveSubscriptionById(
      filterUpdateSubscriptionDto.id,
      updateSubscriptionDto
    )
    return instantiate({ ...response.updated, id: response.updated.PK }, SubscriptionEntity)
  }

  async getSubscription(filter: FilterGetSubscriptionDto): Promise<SubscriptionEntity> {
    const object = await this.subscriptionRepo.getSubscriptionById(filter.id)
    return instantiate({ id: object.PK, ...object }, SubscriptionEntity)
  }

  async getActiveSubscriptions(_filter?: FilterGetSubscriptionsDto): Promise<SubscriptionEntity[]> {
    const objects = await this.subscriptionRepo.getActiveSubscriptions()

    return objects.map((object) =>
      instantiate(
        {
          ...object,
          id: object.PK
        },
        SubscriptionEntity
      )
    )
  }

  async archiveSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
    await this.subscriptionRepo.archiveSubscription(filter)
    return filter.id
  }

  // async deleteSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
  //   return
  // }

  // async restoreSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
  //   return
  // }
}
