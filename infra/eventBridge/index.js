const stringify = require("fast-safe-stringify")

const consume = async (event) => {
  // eslint-disable-next-line no-console
  console.log(`Local EventBridge event received: ${stringify(event, null, 2)}`)
  return { statusCode: 200, body: stringify(event) }
}

module.exports = { consume }