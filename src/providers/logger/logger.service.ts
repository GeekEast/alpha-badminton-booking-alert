/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, ConsoleLoggerOptions, Inject, Injectable, Optional } from "@nestjs/common"
import stringify from "fast-safe-stringify"
import { isError, isString } from "lodash"
import { ClsService } from "nestjs-cls"
import { serializeError } from "serialize-error"

import { ContextStore } from "../../common/interface/contextStore.interface"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../config/global.config"
import { Context } from "../context/context"

@Injectable()
export class Logger extends ConsoleLogger {
  constructor()
  constructor(context: string)
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    clsService: ClsService<ContextStore>,
    config: typeof GLOBAL_CONFIG
  )
  constructor(
    @Optional() protected context?: string,
    @Optional() protected options: ConsoleLoggerOptions = {},
    @Optional() protected clsService?: ClsService<ContextStore>,
    @Optional() @Inject(GLOBAL_CONFIG_PROVIDER) protected config?: typeof GLOBAL_CONFIG
  ) {
    super(context, options)
  }

  log(message: any, context?: string): void
  log(message: any, ...optionalParams: [...any, string?]): void
  log(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessageStr(message)

    const context = this.clsService?.get("context")?.toJson()
    const contextStr = this.config.IS_ONLINE ? stringify(context) : stringify(context, null, 2)

    context
      ? super.log(formattedMessage + " @_@ " + contextStr, ...optionalParams)
      : super.log(formattedMessage, ...optionalParams)
  }

  error(message: any, stackOrContext?: string): void
  error(message: any, stack?: string, context?: string): void
  error(message: any, ...optionalParams: [...any, string?, string?]): void
  error(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessageStr(message)

    const context = this.clsService?.get("context") as unknown as Context
    const contextBeautified = context?.toJson()
    const contextStr = this.config.IS_ONLINE ? stringify(contextBeautified) : stringify(contextBeautified, null, 2)

    context
      ? super.error(formattedMessage + " @_@ " + contextStr, ...optionalParams)
      : super.error(formattedMessage, ...optionalParams)
  }

  warn(message: any, context?: string): void
  warn(message: any, ...optionalParams: [...any, string?]): void
  warn(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessageStr(message)

    const context = this.clsService?.get("context") as unknown as Context
    const contextBeautified = context?.toJson()
    const contextStr = this.config.IS_ONLINE ? stringify(contextBeautified) : stringify(contextBeautified, null, 2)

    context
      ? super.warn(formattedMessage + " @_@ " + contextStr, ...optionalParams)
      : super.warn(formattedMessage, ...optionalParams)
  }

  debug(message: any, context?: string): void
  debug(message: any, ...optionalParams: [...any, string?]): void
  debug(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessageStr(message)

    const context = this.clsService?.get("context")?.toJson()
    const contextStr = this.config.IS_ONLINE ? stringify(context) : stringify(context, null, 2)

    context
      ? super.debug(formattedMessage + " @_@ " + contextStr, ...optionalParams)
      : super.debug(formattedMessage, ...optionalParams)
  }

  verbose(message: any, context?: string): void
  verbose(message: any, ...optionalParams: [...any, string?]): void
  verbose(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatMessageStr(message)

    const context = this.clsService?.get("context")?.toJson()
    const contextStr = this.config.IS_ONLINE ? stringify(context) : stringify(context, null, 2)

    context
      ? super.verbose(formattedMessage + " @_@ " + contextStr, ...optionalParams)
      : super.verbose(formattedMessage, ...optionalParams)
  }

  private formatMessageStr(message: unknown): string {
    // client decides the form of message
    if (isString(message)) {
      return message
    }
    if (isError(message)) {
      const errorObj = serializeError(message)
      return this.config.IS_ONLINE ? stringify(errorObj) : stringify(errorObj, null, 2)
    }

    return this.config.IS_ONLINE ? stringify(message) : stringify(message, null, 2)
  }
}
