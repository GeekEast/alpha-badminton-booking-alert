const { inject } = require("./dynamo.util")
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb")

const tableName = process.env["DYNAMODB_SUBSCRIPTION_TABLE_NAME"]

// define seed data here
const items = [
  {
    PK: "98c7e048-b808-44b9-a726-3c69395515d5",
    start: 1635764853730,
    end: 1635764853730,
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com"
    },
    createdAt: 1635764853730,
    updatedAt: 1635764853730
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
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  }
  const command = new CreateTableCommand(params)
  await client.send(command)
}

inject(items, tableName, createTable)
