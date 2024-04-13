import { GLOBAL_CONFIG } from "../../providers/config/global.config"

export const cors = GLOBAL_CONFIG.IS_ONLINE
  ? false
  : {
      origin: "https://studio.apollographql.com",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    }
