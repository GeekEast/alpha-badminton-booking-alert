import { Schema } from "dynamoose"

export const SubscriptionSchema = new Schema({
  PK: {
    hashKey: true,
    type: String
  },
  start: { type: Date },
  end: { type: Date },
  user: {
    type: Object,
    schema: {
      firstName: String,
      lastName: String,
      email: String,
      timezone: String
    }
  },
  court: { type: String },
  tags: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          name: String,
          value: String
        }
      }
    ]
  },
  createdAt: Date,
  updatedAt: Date,
  archivedAt: Date
})
