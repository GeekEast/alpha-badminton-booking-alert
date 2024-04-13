#!/usr/bin/env zx
$.verbose = true

const primaryContainer = "phapi-li-mongo-primary"

const initializeMongoCluster = async () => {
  console.log(chalk.green("configuring local mongo cluster"))
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_configure_mongo_cluster.sh`
}

const seed = async () => {
  console.log(chalk.green("seeding data into mongo cluster"))
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_db_scripts.sh`
}

const index = async () => {
  console.log(chalk.green("indexing data"))
  await $`docker exec -it ${primaryContainer} bash ./scripts/run_indexing_scripts.sh`
}

const infraUp = async () => {
  console.log(chalk.green("building up the mongo and dynamodb"))
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local up -d`
  await sleep(3000)
  await initializeMongoCluster()
  await seed()
  await index()
}

const infraDown = async () => {
  await $`docker-compose -f docker-compose.local.yml --env-file .env.local down`
}

if (argv._.length > 0) {
  const mode = argv._.pop()
  switch (mode) {
    case "seed":
      await seed()
      break
    case "index":
      await index()
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
