import { ITaggable } from "../../../../common/interface/taggable.interface"
import { IUser } from "./user.interface"

export interface ISubscriptionKey {
  PK: string
}

export interface ISubscription extends ISubscriptionKey, ITaggable {
  start: Date
  end: Date
  user: IUser
  court?: string
  enableEmail: boolean
  // in minutes
  interval: number
  lastEmailSentAt?: Date
  createdAt: Date
  updatedAt: Date
  archivedAt?: Date
}

export interface ICreateSubscription extends ITaggable {
  id: string
  start: Date
  end: Date
  user: IUser
  court?: string
  // in minutes
  interval: number
  enableEmail: boolean
}

export interface IFilterGetSubscription {
  id: string
}
export interface IUpdateSubscription extends ITaggable {
  start?: Date
  end?: Date
  user?: IUser
  court?: string
  enableEmail?: boolean
  // in minutes
  interval?: number
  lastEmailSentAt?: Date
}

export interface IFilterGetSubscriptionsByIds {
  ids: string[]
}
