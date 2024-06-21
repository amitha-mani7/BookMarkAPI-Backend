import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Test@123",
  database: "githubproject",
  logging: ["error"],
  entities: ["src/entity/*.ts"], //['./dist/Entities/Subscriptions.js'],
  extra: { trustServerCertificate: true },
});
