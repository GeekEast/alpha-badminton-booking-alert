import { Controller, Get } from "@nestjs/common"

import { CrewlerService } from "./crewler.service"

@Controller("crewler")
export class CrewlerController {
  constructor(private readonly crewlerService: CrewlerService) {}

  @Get()
  async crew() {
    return this.crewlerService.crewAlphaEgertonBookings(2024, 4, 18)
  }
}
