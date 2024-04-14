import { Injectable, Logger } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import * as dayjs from "dayjs"

import { CrewlerService } from "../crewler/crewler.service"
import { NotificationService } from "../notification/notification.service"
import { SubscriptionEntity } from "../subscription/entity/subscription.entity"
import { SubscriptionService } from "../subscription/subscription.service"

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly crewlerService: CrewlerService,
    private readonly notificationService: NotificationService
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async scanSubscriptions() {
    const subscriptions = await this.subscriptionService.getActiveSubscriptions()
    for (const subscription of subscriptions) {
      await this.processSubscriptions(subscription)
    }
  }

  async processSubscriptions(subscription: SubscriptionEntity) {
    // must be in sydney timezone
    const start = dayjs.utc(subscription.start).tz("Australia/Sydney")
    const end = dayjs.utc(subscription.end).tz("Australia/Sydney")
    const timeSlots = await this.crewlerService.crewAlphaEgertonBookings(start.year(), start.month() + 1, start.date())

    const found = []
    for (const timeSlot of timeSlots) {
      const timeSlotStart = dayjs.utc(timeSlot.start).tz("Australia/Sydney")
      const timeSlotEnd = dayjs.utc(timeSlot.end).tz("Australia/Sydney")

      if (timeSlotEnd.isSameOrBefore(end) && timeSlotStart.isSameOrAfter(start) && timeSlot.available) {
        if (subscription.court) {
          if (timeSlot.court === subscription.court) {
            found.push(timeSlot)
          }
          continue
        }
        found.push(timeSlot)
      }
    }
    this.notificationService.notify(subscription, found)
  }
}
