import { LogLevel, Provider } from "@nestjs/common"

const SERVICE_NAME = "BADMINTON-BOOKING-ALARM"

// basic config
const NODE_ENV = process.env.NODE_ENV || "development"
const PORT = process.env.FARGATE_EXPRESS_PORT || 80
const STAGE = process.env.STAGE
const REGION = process.env.REGION
const REGION_SHORT = process.env.REGION_SHORT

const IS_LOCAL = STAGE === "local" || STAGE === undefined || STAGE === ""
const IS_TEST = STAGE === "test"
const IS_OFFLINE = IS_LOCAL || IS_TEST

const IS_DEV = STAGE === "dev"
const IS_QA = STAGE === "qa"
const IS_SANDBOX = STAGE === "sandbox"
const IS_PRODUCT = STAGE === "product"
const IS_ONLINE = IS_DEV || IS_QA || IS_SANDBOX || IS_PRODUCT

// graphql
const GRAPHQL_PATH = `/api/${REGION}/graphql`
const GQL_NAME_PREFIX = "BBA"

// logger
const DEFAULT_LOG_LEVELS_STR = "log,warn,error,debug,verbose"
const LOG_LEVELS_STR = process.env.LOG_LEVEL ? String(process.env.LOG_LEVEL).toLowerCase() : DEFAULT_LOG_LEVELS_STR
const LOG_LEVELS = LOG_LEVELS_STR.split(/[\s,]+/) as LogLevel[]

// dynamoose
const DYNAMO_ENDPOINT = process.env.DYNAMO_ENDPOINT // setup for local dynamodb only
const DYNAMODB_SUBSCRIPTION_TABLE_NAME = process.env.DYNAMODB_SUBSCRIPTION_TABLE_NAME
const DYNAMODB_USER_TABLE_NAME = process.env.DYNAMODB_USER_TABLE_NAME

// event bus
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME
const EVENT_BUS_SOURCE = process.env.EVENT_BUS_SOURCE
const OFFLINE_EVENT_BUS_ENDPOINT = process.env.OFFLINE_EVENT_BUS_ENDPOINT

// email
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

export const GLOBAL_CONFIG = {
  SERVICE_NAME,
  NODE_ENV,
  PORT,
  STAGE,
  REGION,
  REGION_SHORT,
  IS_LOCAL,
  IS_TEST,
  IS_OFFLINE,
  IS_DEV,
  IS_QA,
  IS_SANDBOX,
  IS_PRODUCT,
  IS_ONLINE,
  GQL_NAME_PREFIX,
  GRAPHQL_PATH,
  EVENT_BUS_NAME,
  EVENT_BUS_SOURCE,
  OFFLINE_EVENT_BUS_ENDPOINT,
  LOG_LEVELS,
  DYNAMO_ENDPOINT,
  DYNAMODB_SUBSCRIPTION_TABLE_NAME,
  DYNAMODB_USER_TABLE_NAME,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS
}

export const GLOBAL_CONFIG_PROVIDER = "GLOBAL_CONFIG"
export const globalConfigProvider: Provider = {
  provide: GLOBAL_CONFIG_PROVIDER,
  useValue: GLOBAL_CONFIG
}
