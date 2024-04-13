import { JwtPayload } from "jwt-decode"

export interface TokenPayload extends Pick<JwtPayload, "iat" | "exp" | "iss" | "sub"> {
  region: string
  organizationId: string
  customerId: string
  hierarchyId: string
  userType: string
}
