import { Injectable, Logger } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import * as dayjs from "dayjs"

import { TimeSlotEntity } from "../crewler/entity/timeSlot.entity"
import { SubscriptionEntity } from "../subscription/entity/subscription.entity"
import { SubscriptionService } from "../subscription/subscription.service"

@Injectable()
export class NotificationService {
  logger = new Logger(NotificationService.name)

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly mailerService: MailerService
  ) {}

  async notify(subscription: SubscriptionEntity, timeSlots?: TimeSlotEntity[]) {
    // won't send email if user has disabled email notification
    if (subscription.archivedAt) {
      return
    }

    // archive subscription if it has expired
    const currentTime = dayjs.utc()
    const expired = dayjs.utc(subscription.start).isSameOrBefore(currentTime)
    if (expired) {
      await this.subscriptionService.archiveSubscription({ id: subscription.id })
      return
    }

    // nothing to notify if no timeSlots
    if (!timeSlots || timeSlots.length === 0) {
      return
    }

    await this.sendEmail(subscription, timeSlots)
  }

  async sendEmail(subscription: SubscriptionEntity, timeSlots: TimeSlotEntity[]) {
    // won't send email if user has disabled email notification
    if (!subscription.enableEmail) {
      return
    }

    this.logger.log(
      `Sending email to ${subscription.user.firstName} ${subscription.user.lastName} at ${subscription.user.email} with available timeSlots}`
    )
    const formattedTimSlots = timeSlots.map((timeSlot) => {
      const startTime = dayjs.tz(timeSlot.start, subscription.user.timezone)
      const endTime = dayjs.tz(timeSlot.end, subscription.user.timezone)
      return `court ${timeSlot.court} available on ${startTime.date()}-${startTime.month() + 1}-${startTime.year()} ${startTime.format("hh:mma")}-${endTime.format("hh:mma")}`
    })
    await this.mailerService.sendMail({
      to: subscription.user.email,
      subject: "Your Badminton Booking Alert",
      text: `${formattedTimSlots.join("\n")}`
    })

    // disable email notification after sending email once
    await this.subscriptionService.updateSubscription(subscription, { enableEmail: false })
  }
}
