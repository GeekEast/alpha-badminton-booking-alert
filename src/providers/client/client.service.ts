import { Injectable } from "@nestjs/common"
import axios, { AxiosInstance } from "axios"
import { GraphQLClient } from "graphql-request"
import { ClsService } from "nestjs-cls"

import { ContextStore } from "../../common/interface/contextStore.interface"
import { Context } from "../context/context"

export interface ClientConfig {
  endpoint: string
  defaultRegion: string
  newRegion?: string
  token?: string
  internal?: boolean
}

@Injectable()
export class ClientService {
  constructor(private readonly clsService: ClsService<ContextStore>) {}

  getAxiosClient({ endpoint, defaultRegion, newRegion }: ClientConfig): AxiosInstance {
    const updatedEndpoint = this.updateRestEndpointWithRegion(endpoint, defaultRegion, newRegion)
    return axios.create({
      baseURL: updatedEndpoint
    })
  }

  getGraphqlRequestClient({ endpoint, defaultRegion, newRegion }: ClientConfig): GraphQLClient {
    const updatedEndpoint = this.updateRestEndpointWithRegion(endpoint, defaultRegion, newRegion)
    return new GraphQLClient(updatedEndpoint)
  }

  private updateRestEndpointWithRegion(endpoint: string, prevRegion: string, newRegion?: string) {
    const regexStr = new RegExp(prevRegion, "g")
    const updatedEndpoint = endpoint.replace(regexStr, newRegion)
    return newRegion ? updatedEndpoint : endpoint
  }

  private getRequestId(): string {
    const authContext = this.clsService.get("context") as Context
    return authContext.requestContext.sapiaRequestId
  }
}
