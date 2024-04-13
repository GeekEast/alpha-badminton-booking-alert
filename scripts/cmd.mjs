#!/usr/bin/env zx

const seed = async () => {
  console.log(chalk.green("dynamodb seeding: subscription "))
  await $`env-cmd -f .env.local node ./scripts/seed/dynamo/subscription.js`

  console.log(chalk.green("dynamodb seeding: user "))
  await $`env-cmd -f .env.local node ./scripts/seed/dynamo/user.js`
}

const infraUp = async () => {
  console.log(chalk.green("building up dynamodb"))
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local up -d`

  await sleep(3000)
  await seed()

  // console.log(chalk.green(`dynamodb local is listening at ${process.env.DYNAMO_ENDPOINT}`))
  console.log(chalk.green(`dynamodb UI is listing at http://localhost:${process.env.DYNAMO_ADMIN_UI_PORT}`))
}

const infraDown = async () => {
  console.log(chalk.green("destroying the dynamodb"))
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local down`
}

if (argv._.length > 0) {
  const mode = argv._.pop()
  switch (mode) {
    case "seed":
      await seed()
      break
    case "up":
      await infraUp()
      break
    case "down":
      await infraDown()
      break
    default:
      break
  }
}
