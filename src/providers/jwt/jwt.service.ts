import { Injectable, Logger } from "@nestjs/common"
import * as dayjs from "dayjs"
import { jwtDecode, JwtPayload } from "jwt-decode"

@Injectable()
export class JWTService {
  logger = new Logger(JWTService.name)

  decodeToken<T extends JwtPayload>(token: string): T {
    if (!token) {
      return
    }
    try {
      const decoded = jwtDecode<T>(token)
      return { ...decoded, expiresAtISOFormat: dayjs.unix(decoded.exp).toISOString() }
    } catch (e) {
      this.logger.warn({ message: `failed to decode token`, error: e, token })
      return
    }
  }
}
