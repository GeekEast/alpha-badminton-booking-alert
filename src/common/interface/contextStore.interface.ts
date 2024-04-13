import { ClsStore } from "nestjs-cls"

import { IContext } from "./context.interface"

export interface ContextStore extends ClsStore {
  // Don't use class here cause nestjs-cls cannot detect complex types of class.
  context: IContext
}
