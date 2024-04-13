import { GLOBAL_CONFIG } from "../../providers/config/global.config"

export const buildGqlNameWithPrefix = (name: string) => {
  return `${GLOBAL_CONFIG.GQL_NAME_PREFIX}${name.charAt(0).toUpperCase() + name.slice(1)}`
}
