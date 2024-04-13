import { Module } from "@nestjs/common"

import { NotifService } from "./notif.service"
// import { DynamooseModule } from "nestjs-dynamoose"

// import { GLOBAL_CONFIG } from "../../providers/config/global.config"

@Module({
  imports: [
    // DynamooseModule.forFeature([
    //   {
    //     name: PolicyModel,
    //     schema: PolicySchema,
    //     options: { tableName: GLOBAL_CONFIG.DYNAMODB_POLICY_TABLE_NAME }
    //   }
    // ])
  ],
  providers: [NotifService],
  exports: [NotifService]
})
export class NotifModule {}
