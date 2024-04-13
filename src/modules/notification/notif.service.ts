import { Injectable, Logger } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"

@Injectable()
export class NotifService {
  private readonly logger = new Logger(NotifService.name)

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.log("Called every minute")
  }
}
