import { Module } from "@nestjs/common"

import { SchedulerService } from "./scheduler.service"

@Module({
  providers: [SchedulerService],
  exports: []
})
export class SchedulerModule {}
