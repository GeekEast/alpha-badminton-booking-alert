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

  async notifyViaEmail(subscription: SubscriptionEntity, timeSlots?: TimeSlotEntity[]) {
    // won't send email if user has disabled email notification
    if (!subscription.enableEmail) {
      return
    }

    const currentTime = dayjs.utc()

    // won't send email if user has already sent one within the interval
    if (subscription.lastEmailSentAt) {
      const lastEmailSentAt = dayjs.utc(subscription.lastEmailSentAt)
      const nextEmailDeliveryDate = lastEmailSentAt.add(subscription.interval, "minutes")
      const shouldSendEmail = currentTime.isSameOrAfter(nextEmailDeliveryDate)
      if (!shouldSendEmail) {
        return
      }
    }

    if (!timeSlots || timeSlots.length === 0) {
      const startAt = dayjs.tz(subscription.start, subscription.user.timezone).format("hh:mma")
      const endAt = dayjs.tz(subscription.end, subscription.user.timezone).format("hh:mma")

      this.logger.log(
        `No available time slots for ${subscription.user.firstName} ${subscription.user.lastName} at ${subscription.user.email} between ${startAt}-${endAt} on court ${subscription.court}`
      )

      await this.mailerService.sendMail({
        to: subscription.user.email,
        subject: "Your Badminton Monitor Alarm",
        text: `No available time slots for ${subscription.user.firstName} ${subscription.user.lastName} between ${startAt}-${endAt} on court ${subscription.court}`
      })

      await this.subscriptionService.updateSubscription(subscription, { lastEmailSentAt: currentTime.toDate() })
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
    await this.mailerService.sendMail({
      to: subscription.user.email,
      subject: "Your Badminton Monitor Alarm",
      text: `${formattedTimSlots.join("\n")}`
    })
    await this.subscriptionService.updateSubscription(subscription, { lastEmailSentAt: currentTime.toDate() })
  }
}
