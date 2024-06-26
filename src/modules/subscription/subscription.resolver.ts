import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { AtLeastNFieldsValidationPipe } from "../../common/pipe/atLeastNFieldsValidation.pipe"
import { buildGqlNameWithPrefix } from "../../common/utils/buildGqlName.util"
import { AddSubscriptionDto } from "./dto/addSubscription.dto"
import { FilterGetSubscriptionDto } from "./dto/filterGetSubscription.dto"
import { UpdateSubscriptionDto } from "./dto/updateSubscription.dto"
import { SubscriptionEntity } from "./entity/subscription.entity"
import { SubscriptionService } from "./subscription.service"

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation(() => SubscriptionEntity, { name: buildGqlNameWithPrefix("addSubscription") })
  async addSubscription(@Args("subscription") addSubscriptionDto: AddSubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionService.createSubscription(addSubscriptionDto)
  }

  @Query(() => SubscriptionEntity, {
    name: buildGqlNameWithPrefix("getSubscription"),
    nullable: true,
    description: "get active subscription by id"
  })
  async getSubscription(
    @Args("filter") filterGetSubscriptionDto: FilterGetSubscriptionDto
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.getSubscription(filterGetSubscriptionDto)
  }

  @Mutation(() => SubscriptionEntity, { name: buildGqlNameWithPrefix("updateSubscription") })
  async updateSubscription(
    @Args("filter") filter: FilterGetSubscriptionDto,
    @Args("update", new AtLeastNFieldsValidationPipe(1)) update: UpdateSubscriptionDto
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.updateSubscription(filter, update)
  }

  // @Query(() => [SubscriptionEntity], {
  //   name: buildGqlNameWithPrefix("getSubscriptions"),
  //   nullable: "items",
  //   description: "get active subscriptions by ids"
  // })
  // async getSubscriptions(@Args("filter") filter: FilterGetSubscriptionsDto): Promise<SubscriptionEntity[]> {
  //   return this.subscriptionService.getActiveSubscriptions(filter)
  // }

  // @Mutation(() => String, {
  //   name: buildGqlNameWithPrefix("deleteSubscription"),
  //   description: "idempotent delete, will return subscription id"
  // })
  // async deleteSubscription(@Args("filter") filterGetSubscriptionDto: FilterGetSubscriptionDto): Promise<string> {
  //   return
  // }

  // @Mutation(() => String, {
  //   name: buildGqlNameWithPrefix("archiveSubscription"),
  //   description: "idempotent archive, will return subscription id"
  // })
  // async archiveSubscription(@Args("filter") filterGetSubscriptionDto: FilterGetSubscriptionDto): Promise<string> {
  //   return
  // }

  // @Mutation(() => String, {
  //   name: buildGqlNameWithPrefix("restoreSubscription"),
  //   description: "idempotent archive, will return subscription id"
  // })
  // async restoreSubscription(@Args("filter") filterGetSubscriptionDto: FilterGetSubscriptionDto): Promise<string> {
  //   return
  // }
}
