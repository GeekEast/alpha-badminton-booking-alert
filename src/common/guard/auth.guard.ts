import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
  logger = new Logger(AuthGuard.name)

  // 1. check whether handler is public
  // 2. csrf detection is cookie is provided
  // 3. authorization (include authentication)
  // 4. authentication
  async canActivate(_ctx: ExecutionContext): Promise<boolean> {
    return true
  }
}
