import { Inject, Injectable } from "@nestjs/common"

import { ExpressContext, IContext } from "../../common/interface/context.interface"
import { GLOBAL_CONFIG, GLOBAL_CONFIG_PROVIDER } from "../config/global.config"
import { Context } from "./context"

@Injectable()
export class ContextFactory {
  constructor(@Inject(GLOBAL_CONFIG_PROVIDER) private config: typeof GLOBAL_CONFIG) {}

  buildContext(context: ExpressContext): IContext {
    return new Context(context, this.config)
  }
}
