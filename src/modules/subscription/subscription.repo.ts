import { ForbiddenException, Injectable } from "@nestjs/common"
import * as dayjs from "dayjs"
import { keyBy, pickBy } from "lodash"
import { InjectModel, Model } from "nestjs-dynamoose"

import {
  ICreateSubscription,
  IFilterGetSubscription,
  IFilterGetSubscriptionsByIds,
  ISubscription,
  ISubscriptionKey,
  IUpdateSubscription
} from "./dao/interface/subscription.interface"
import { SubscriptionModel } from "./dao/schema"

@Injectable()
export class SubscriptionRepo {
  constructor(
    @InjectModel(SubscriptionModel) private readonly subscriptionModel: Model<ISubscription, ISubscriptionKey>
  ) {}

  async createSubscription(subscriptionToCreate: ICreateSubscription): Promise<ISubscription> {
    const existSubscription: ISubscription = await this.getSubscriptionById(`${subscriptionToCreate.id}`)

    if (existSubscription && !existSubscription.archivedAt) {
      throw new ForbiddenException(`subscription exists (active)`)
    }
    if (existSubscription && existSubscription.archivedAt) {
      throw new ForbiddenException(`subscription exists (archived)`)
    }

    const currentDate = new Date()
    const subscriptionToInject: ISubscription = {
      PK: `${subscriptionToCreate.id}`,
      start: subscriptionToCreate.start,
      end: subscriptionToCreate.end,
      user: subscriptionToCreate.user,
      court: subscriptionToCreate.court,
      enableEmail: subscriptionToCreate.enableEmail,
      interval: subscriptionToCreate.interval,
      tags: subscriptionToCreate.tags.map((tag) => ({ ...tag })),
      createdAt: currentDate,
      updatedAt: currentDate
    }

    return this.subscriptionModel.create(subscriptionToInject)
  }

  async getSubscriptionById(id: string): Promise<ISubscription> {
    return this.subscriptionModel.get({ PK: id })
  }

  async getActiveSubscriptionById(id: string): Promise<ISubscription> {
    const subscription = await this.getSubscriptionById(id)
    return subscription?.archivedAt ? null : subscription
  }

  async getSubscriptionsByIds(ids: string[]): Promise<ISubscription[]> {
    // this will only return non-null policies
    const subscriptionObjsArray = await this.subscriptionModel.batchGet(ids.map((id) => ({ PK: `${id}` })))

    // convert array to object
    const subscriptionObjs = keyBy(subscriptionObjsArray, "PK")

    return ids.map((id) => subscriptionObjs[`${id}`] ?? null)
  }

  async getActiveSubscriptionsByIds(
    filterGetSubscriptionsByIds: IFilterGetSubscriptionsByIds
  ): Promise<ISubscription[]> {
    const policies = await this.getSubscriptionsByIds(filterGetSubscriptionsByIds.ids)
    return policies.map((subscription) => {
      if (!subscription) {
        return subscription
      }

      if (subscription.archivedAt) {
        return null
      }
      return subscription
    })
  }

  async updateSubscription(
    filter: IFilterGetSubscription,
    update: IUpdateSubscription
  ): Promise<{ updated: ISubscription; fieldsUpdated: Partial<ISubscription> }> {
    const currentDate = new Date()
    const subscriptionToUpdate: IUpdateSubscription = {
      court: update.court,
      enableEmail: update.enableEmail,
      interval: update.interval,
      lastEmailSentAt: update.lastEmailSentAt,
      tags: update.tags && update.tags.map((tag) => ({ ...tag }))
    }
    const condensedSubscriptionToUpdate = pickBy(subscriptionToUpdate, (val) => val !== null && val !== undefined)
    const fieldsToUpdate = { ...condensedSubscriptionToUpdate, updatedAt: currentDate }
    const updated = await this.subscriptionModel.update({ PK: `${filter.id}` }, fieldsToUpdate)
    return { updated, fieldsUpdated: fieldsToUpdate }
  }

  async updateActiveSubscriptionById(
    id: string,
    updateSubscription: IUpdateSubscription
  ): Promise<{ updated: ISubscription; fieldsUpdated: Partial<ISubscription> }> {
    const exist = await this.getSubscriptionById(id)
    if (!exist) {
      throw new ForbiddenException("cannot update non-exist subscription")
    }
    if (exist.archivedAt) {
      throw new ForbiddenException("cannot update archived subscription")
    }
    return this.updateSubscription({ id }, updateSubscription)
  }

  async archiveSubscription(filter: IFilterGetSubscription): Promise<ISubscription> {
    const exist = await this.getSubscriptionById(filter.id)
    if (!exist) {
      throw new ForbiddenException("cannot archive non-exist subscription")
    }
    if (exist.archivedAt) {
      return null
    }

    const currentDate = new Date()
    return this.subscriptionModel.update({ PK: `${filter.id}` }, { updatedAt: currentDate, archivedAt: currentDate })
  }

  async restoreSubscription(filter: IFilterGetSubscription): Promise<ISubscription> {
    const exist = await this.getSubscriptionById(filter.id)
    if (!exist) {
      throw new ForbiddenException("cannot restore non-exist subscription")
    }
    if (!exist.archivedAt) {
      return null
    }

    const currentDate = new Date()
    return this.subscriptionModel.update({ PK: `${filter.id}` }, { updatedAt: currentDate, archivedAt: undefined })
  }

  async deleteSubscription(filter: IFilterGetSubscription): Promise<ISubscription> {
    const exist = await this.getSubscriptionById(filter.id)
    if (exist) {
      await this.subscriptionModel.delete({ PK: `${filter.id}` })
    }
    return exist
  }

  async getActiveSubscriptions(): Promise<ISubscription[]> {
    const currTime = dayjs().valueOf()
    const result = await this.subscriptionModel
      .scan("start")
      .gt(currTime)
      .where("end")
      .gt(currTime)
      .where("archivedAt")
      .not()
      .exists()
      .all()
      .exec()
    return result.map((r) => r.toJSON() as ISubscription)
  }
}
