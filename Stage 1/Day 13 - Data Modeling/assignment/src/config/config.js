import { getEnv } from "../lib/env.js";
const config = {
  development: {
    username: getEnv("DB_USER"),
    password: getEnv("DB_PASS"),
    database: getEnv("DB_NAME"),
    host: getEnv("DB_HOST"),
    port: getEnv("DB_PORT"),
    dialect: getEnv("DB_DIALECT"),
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: getEnv("DB_USER"),
    password: getEnv("DB_PASS"),
    database: getEnv("DB_NAME"),
    host: getEnv("DB_HOST"),
    port: getEnv("DB_PORT"),
    dialect: getEnv("DB_DIALECT"),
  },
};
console.log(config);
export default config;
