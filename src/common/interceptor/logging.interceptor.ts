import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { ClsService } from "nestjs-cls"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

import { Context } from "../../providers/context/context"
import { ContextStore } from "../interface/contextStore.interface"

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger(LoggingInterceptor.name)

  constructor(private clsService: ClsService<ContextStore>) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const reqStartTime = Date.now()
    // ! able convert to GqlExecutionContext regardless restful or graphql request
    const context = GqlExecutionContext.create(ctx)

    const formattedContextInfo = {
      path: `${context.getClass().name}.${context.getHandler().name}`,
      time: `${Date.now() - reqStartTime} ms`
    }

    const isELBHealthCheckRequest = this.isELBHealthCheckRequest()

    return next.handle().pipe(
      tap({
        next: (value) => {
          if (!isELBHealthCheckRequest) {
            this.logger.log({
              ...formattedContextInfo,
              response: value
            })
          }
        },
        error: (error) => {
          if (!isELBHealthCheckRequest) {
            this.logger.error({
              ...formattedContextInfo,
              error: error
            })
          }
        }
      })
    )
  }

  isELBHealthCheckRequest(): boolean {
    const context = this.clsService.get("context") as unknown as Context
    const userAgent = context?.requestContext?.userAgent
    return userAgent?.includes("ELB-HealthChecker")
  }
}
