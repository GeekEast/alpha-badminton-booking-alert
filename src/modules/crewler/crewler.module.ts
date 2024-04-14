import { CacheModule } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"

import { CrewlerController } from "./crewler.controller"
import { CrewlerService } from "./crewler.service"

@Module({
  imports: [CacheModule.register({ ttl: 60 * 1000 })],
  controllers: [CrewlerController],
  providers: [CrewlerService],
  exports: [CrewlerService]
})
export class CrewlerModule {}
