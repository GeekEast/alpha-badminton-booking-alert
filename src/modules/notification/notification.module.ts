import { Module } from "@nestjs/common"
import { MailerModule } from "@nestjs-modules/mailer"

import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../../providers/config/global.config"
import { SubscriptionModule } from "../subscription/subscription.module"
import { NotificationService } from "./notification.service"

@Module({
  imports: [
    SubscriptionModule,
    MailerModule.forRootAsync({
      useFactory: (config: typeof GLOBAL_CONFIG) => {
        return {
          transport: {
            host: config.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
              user: config.SMTP_USER,
              pass: config.SMTP_PASS
            }
          },
          defaults: {
            from: `"No Reply" <james.hobby.tan@gmail.com>`
          }
        }
      },

      inject: [GLOBAL_CONFIG_PROVIDER]
    })
  ],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
