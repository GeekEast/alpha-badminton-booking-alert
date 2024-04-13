import { SchedulerModule } from "./scheduler/scheduler.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { SubscriptionResolver } from "./subscription/subscription.resolver"

export const GraphQLModules = [SubscriptionModule]
export const RestfulModules = []
export const GraphQLResolvers = [SubscriptionResolver]
export const ScheduleModules = [SchedulerModule]
