import { Global, Module } from "@nestjs/common"

import { ContextFactory } from "./context.factory"

@Global()
@Module({
  providers: [ContextFactory],
  exports: [ContextFactory]
})
export class ContextModule {}
