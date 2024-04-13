import { ClsModuleFactoryOptions, ClsService } from "nestjs-cls"

import { ContextFactory } from "../../providers/context/context.factory"
import { ContextStore } from "../interface/contextStore.interface"

export const initClsStoreInMiddleware = (
  contextFactory: ContextFactory
): Promise<ClsModuleFactoryOptions> | ClsModuleFactoryOptions => {
  return {
    middleware: {
      mount: true,
      setup: async (clsService: ClsService<ContextStore>, req, res) => {
        clsService.set("context", contextFactory.buildContext({ req, res }))
      }
    }
  }
}
