import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Get("/")
  async healthCheck(): Promise<string> {
    return "Welcome to Core-LI Service."
  }
}
