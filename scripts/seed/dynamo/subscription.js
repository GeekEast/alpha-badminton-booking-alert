const { inject } = require("./dynamo.util")
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb")

const tableName = process.env["DYNAMODB_SUBSCRIPTION_TABLE_NAME"]

// define seed data here
const items = [
  {
    createdAt: 1713081218738,
    start: 1713427200000,
    end: 1713445200000,
    PK: "3ff37f46-35ec-4333-b217-c37a4f3bdcdd",
    court: "18",
    user: {
      firstName: "James",
      lastName: "Tan",
      email: "james@sapia.ai",
      timezone: "Australia/Sydney"
    },
    tags: [],
    updatedAt: 1713081218738
  }
]

const createTable = async (client, tableName) => {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: "PK",
        AttributeType: "S"
      }
    ],
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH"
      }
    ],
    // GlobalSecondaryIndexes: [
    //   {
    //     IndexName: "start-end-index",
    //     KeySchema: [
    //       {
    //         AttributeName: "start",
    //         KeyType: "HASH"
    //       },
    //       {
    //         AttributeName: "end",
    //         KeyType: "RANGE"
    //       }
    //     ],
    //     Projection: {
    //       ProjectionType: "ALL"
    //     },
    //     ProvisionedThroughput: {
    //       ReadCapacityUnits: 10,
    //       WriteCapacityUnits: 5
    //     }
    //   }
    // ],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  }
  const command = new CreateTableCommand(params)
  await client.send(command)
}

inject(items, tableName, createTable)
