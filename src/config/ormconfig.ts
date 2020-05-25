import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: 3306,
  username: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DB || "demo",
  entities: [
    __dirname + "/../entity/*.ts"
  ],
  migrations: ["../migration/*.ts"],
  cli: {
    migrationsDir: "migration"
  },
  synchronize: true,
  logging: false
}

export default config;