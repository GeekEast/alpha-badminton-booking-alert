import { Request, Response } from "express"

import { ExpressContext, IContext, RequestContext, ResponseContext } from "../../common/interface/context.interface"
import { GLOBAL_CONFIG } from "../config/global.config"

export class Context implements IContext {
  private readonly _requestContext: RequestContext

  constructor(
    private _context: ExpressContext,
    private _config: typeof GLOBAL_CONFIG
  ) {}

  get expressContext() {
    return this._context
  }

  get config() {
    return this._config
  }

  get req(): Request {
    return this._context.req
  }

  get res(): Response {
    return this._context.res
  }

  get requestContext() {
    return this._requestContext
  }

  get responseContext() {
    return this.buildResponseContext()
  }

  toJson() {
    return {
      requestContext: this._requestContext,
      responseContext: this.buildResponseContext()
    }
  }

  buildResponseContext(): ResponseContext {
    return {
      headers: this.res.getHeaders()
    }
  }
}
