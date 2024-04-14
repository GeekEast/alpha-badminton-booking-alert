import { Module } from "@nestjs/common"

import { CrewlerModule } from "../crewler/crewler.module"
import { NotificationModule } from "../notification/notification.module"
import { SubscriptionModule } from "../subscription/subscription.module"
import { SchedulerService } from "./scheduler.service"

@Module({
  imports: [SubscriptionModule, CrewlerModule, NotificationModule],
  providers: [SchedulerService],
  exports: []
})
export class SchedulerModule {}
