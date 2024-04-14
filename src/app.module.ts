import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo"
import { MiddlewareConsumer, Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ScheduleModule } from "@nestjs/schedule"
import { ClsModule, ClsService } from "nestjs-cls"
import { DynamooseModule } from "nestjs-dynamoose"

import { AppController } from "./app.controller"
import { generateApolloFederationConfig } from "./common/apollo/federation/generateApolloFederationConfig"
import { initClsStoreInMiddleware } from "./common/cls/initClsStoreInMiddleware"
import { generateDynamooseConfig } from "./common/dynamoose/generateDynamooseConfig"
import { GraphQLModules, RestfulModules, ServiceModules } from "./modules"
import { GLOBAL_CONFIG_PROVIDER } from "./providers/config/global.config"
import { ContextFactory } from "./providers/context/context.factory"
import { GlobalModules, globalProviders } from "./providers/global.provider"

@Module({
  imports: [
    ...GlobalModules,
    ...GraphQLModules,
    ...RestfulModules,
    ...ServiceModules,
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: generateApolloFederationConfig,
      inject: [ClsService, GLOBAL_CONFIG_PROVIDER]
    }),
    ClsModule.forRootAsync({
      global: true,
      useFactory: initClsStoreInMiddleware,
      inject: [ContextFactory]
    }),
    DynamooseModule.forRootAsync({
      useFactory: generateDynamooseConfig,
      inject: [GLOBAL_CONFIG_PROVIDER]
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: globalProviders
})
export class AppModule {
  configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(RequestIdMiddleware).forRoutes("*")
  }
}
