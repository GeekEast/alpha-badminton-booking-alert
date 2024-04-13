import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"

import { AppModule } from "../app.module"

describe("Application", () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET`, () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Welcome to Core-LI Service.")
  })

  afterAll(async () => {
    await app.close()
  })
})
