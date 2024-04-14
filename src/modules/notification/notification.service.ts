import { Injectable, Logger } from "@nestjs/common"
import * as dayjs from "dayjs"

import { TimeSlotEntity } from "../crewler/entity/timeSlot.entity"
import { SubscriptionEntity } from "../subscription/entity/subscription.entity"

@Injectable()
export class NotificationService {
  logger = new Logger(NotificationService.name)

  async notifyViaEmail(subscription: SubscriptionEntity, timeSlots?: TimeSlotEntity[]) {
    if (!timeSlots || timeSlots.length === 0) {
      const startAt = dayjs.tz(subscription.start, subscription.user.timezone).format("hh:mma")
      const endAt = dayjs.tz(subscription.end, subscription.user.timezone).format("hh:mma")

      this.logger.log(
        `No available time slots for ${subscription.user.firstName} ${subscription.user.lastName} at ${subscription.user.email} between ${startAt}-${endAt} on court ${subscription.court}`
      )
      return
    }
    const formattedTimSlots = timeSlots.map((timeSlot) => {
      const startTime = dayjs.tz(timeSlot.start, subscription.user.timezone)
      const endTime = dayjs.tz(timeSlot.end, subscription.user.timezone)
      return `court ${timeSlot.court} available on ${startTime.date()}-${startTime.month() + 1}-${startTime.year()} ${startTime.format("hh:mma")}-${endTime.format("hh:mma")}`
    })

    this.logger.log(
      `Sending email to ${subscription.user.firstName} ${subscription.user.lastName} at ${subscription.user.email} with available timeSlots:\n${formattedTimSlots.join("\n")}`
    )
  }
}
