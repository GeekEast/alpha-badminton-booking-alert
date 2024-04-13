import { INestApplication, ValidationPipe } from "@nestjs/common"

import { Logger } from "../../providers/logger/logger.service"

export const applyGlobalSettings = async (app: INestApplication) => {
  // setup logger
  app.useLogger(app.get(Logger))
  // setup global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
}
