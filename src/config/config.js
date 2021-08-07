const dotenv = require("dotenv");
const logger = require("loglevel");

dotenv.config();
logger.enableAll();

const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  ACCESS_TOKEN_SECRET,
  PORT = 4000,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
} = process.env;

const CONFIG = {
  production: {
    app: {
      PORT: PORT || 4000,
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
    jwt: {
      SECRET: ACCESS_TOKEN_SECRET,
    },
  },
  development: {
    app: {
      PORT: PORT || 4000,
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
    jwt: {
      SECRET: ACCESS_TOKEN_SECRET,
    },
  },
  test: {
    app: {
      PORT: PORT || 4000,
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
    jwt: {
      SECRET: ACCESS_TOKEN_SECRET,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};
