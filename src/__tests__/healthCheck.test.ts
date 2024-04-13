import { Test } from "@nestjs/testing"

import { AppController } from "../app.controller"

describe("AppController.healthCheck", () => {
  let appController: AppController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController]
    }).compile()
    appController = moduleRef.get<AppController>(AppController)
  })

  it("should return `Welcome to Core-LI Service.` as response", async () => {
    const message = await appController.healthCheck()
    expect(message).toEqual("Welcome to Core-LI Service.")
  })
})
