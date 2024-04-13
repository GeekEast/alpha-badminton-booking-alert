import { Request, Response } from "express"
import { OutgoingHttpHeaders } from "http"

import { DOMAIN_BRAND } from "../enum"

export interface IContext {
  toJson(): Record<string, unknown>
}

export interface RequestContext {
  // client domain related
  ip: Request["ip"]
  uiThirdLevelDomainName?: string // qa.predictivehire.com
  uiDomainBrand?: DOMAIN_BRAND // PH | SAPIA
  uiEndpoint?: string // https://edge.qa.predictivehire.com/
  userAgent?: string

  // query related
  url?: Request["url"]
  headers?: Request["headers"]
  hostname?: Request["hostname"]
  params?: Request["params"]
  query?: Request["query"]
  body?: Request["body"]
  method?: Request["method"]

  // observability related
  sapiaRequestId?: string
}

export interface ResponseContext {
  headers: OutgoingHttpHeaders
}

export interface CookiesContext {
  cookies: Record<string, string>
  decryptedCookies: Record<string, string>
}

export interface ExpressContext {
  req: Request
  res: Response
}
