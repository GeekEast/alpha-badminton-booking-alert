const { inject } = require("./dynamo.util")
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb")

const tableName = process.env["DYNAMODB_USER_TABLE_NAME"]

// define seed data here
const items = []

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
