import { Injectable } from "@nestjs/common"

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
    return
  }

  async updateSubscription(
    filterUpdateSubscriptionDto: FilterGetSubscriptionDto,
    updateSubscriptionDto: UpdateSubscriptionDto
  ): Promise<SubscriptionEntity> {
    return
  }

  async deleteSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
    return
  }

  async getSubscription(filter: FilterGetSubscriptionDto): Promise<SubscriptionEntity> {
    return
  }

  async getSubscriptions(filter: FilterGetSubscriptionsDto): Promise<SubscriptionEntity[]> {
    return
  }

  async archiveSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
    return
  }

  async restoreSubscription(filter: FilterGetSubscriptionDto): Promise<string> {
    return
  }
}
