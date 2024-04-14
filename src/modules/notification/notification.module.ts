import { Module } from "@nestjs/common"

import { SubscriptionModule } from "../subscription/subscription.module"
import { NotificationService } from "./notification.service"

@Module({
  imports: [SubscriptionModule],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
