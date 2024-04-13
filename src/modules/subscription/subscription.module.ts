import { Module } from "@nestjs/common"
import { DynamooseModule } from "nestjs-dynamoose"

import { GLOBAL_CONFIG } from "../../providers/config/global.config"
import { SubscriptionModel } from "./dao/schema"
import { SubscriptionSchema } from "./dao/schema/subscription.model"
import { SubscriptionService } from "./subscription.service"

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: SubscriptionModel,
        schema: SubscriptionSchema,
        options: { tableName: GLOBAL_CONFIG.DYNAMODB_SUBSCRIPTION_TABLE_NAME }
      }
    ])
  ],
  providers: [SubscriptionService],
  exports: []
})
export class SubscriptionModule {}
