const { ListTablesCommand, DynamoDBClient, DeleteTableCommand } = require("@aws-sdk/client-dynamodb")
const { BatchWriteCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb")
const { chunk } = require("lodash")

const initDynamoDBTables = async (client, tableName, createTable, deleteTable) => {
  const { TableNames } = await client.send(new ListTablesCommand({}))
  if (!TableNames.includes(tableName)) {
  } else {
    await client.send(new DeleteTableCommand({ TableName: tableName }))
  }
  await createTable(client, tableName)
}

const batchInjectDynamoItems = async (docClient, tableName, items) => {
  // ! 25 is upper limit of dynamodb batch update operation
  const itemChunks = chunk(items, 25)

  for (const chunk of itemChunks) {
    const putRequests = chunk.map((item) => ({
      PutRequest: {
        Item: item
      }
    }))
    const command = new BatchWriteCommand({
      RequestItems: {
        // An existing table is required. A composite key of 'title' and 'year' is recommended
        // to account for duplicate titles.
        [tableName]: putRequests
      }
    })

    await docClient.send(command)
  }
}

const inject = async (items, tableName, createTable) => {
  const client = new DynamoDBClient({
    endpoint: process.env["DYNAMO_ENDPOINT"],
    region: "ap-southeast-2",
    credentials: { accessKeyId: "LOCAL", secretAccessKey: "LOCAL" },
    maxAttempts: 100
  })
  await initDynamoDBTables(client, tableName, createTable)

  const docClient = DynamoDBDocumentClient.from(client)
  await batchInjectDynamoItems(docClient, tableName, items)
}

module.exports = { inject }
