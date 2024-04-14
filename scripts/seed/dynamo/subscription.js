const { inject } = require("./dynamo.util")
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb")

const tableName = process.env["DYNAMODB_SUBSCRIPTION_TABLE_NAME"]

// define seed data here
const items = [
  {
    createdAt: 1713086557413,
    start: 1713427200000,
    end: 1713445200000,
    interval: 1,
    PK: "332a12b7-d822-4beb-9edf-51943929e288",
    court: "18",
    enableEmail: true,
    user: {
      firstName: "James",
      lastName: "Nod",
      email: "james@example.ai",
      timezone: "Australia/Sydney"
    },
    tags: [],
    updatedAt: 1713087770443
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
