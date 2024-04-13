import { Logger } from "@nestjs/common"

export const monitorNodeUnhandledError = () => {
  process.on("uncaughtRejection", (err) => {
    Logger.error(err)
  })

  process.on("uncaughtException", (err) => {
    Logger.error(err)
  })
}
