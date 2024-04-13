import { DynamicModule, ForwardReference, Provider, Type } from "@nestjs/common"
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core"

import { AuthGuard } from "../common/guard/auth.guard"
import { LoggingInterceptor } from "../common/interceptor/logging.interceptor"
import { ClientModule } from "./client/client.module"
import { ConfigModule } from "./config/config.module"
import { ContextModule } from "./context/context.module"
import { EventBaseModule } from "./event"
import { LoggerModule } from "./logger/logger.module"

export const GlobalModules: Array<Type<unknown> | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
  ConfigModule,
  ContextModule,
  LoggerModule,
  EventBaseModule,
  ClientModule
]

export const globalProviders: Provider[] = [
  { provide: APP_GUARD, useClass: AuthGuard },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }
]
