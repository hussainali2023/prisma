/// <reference types="node" />


import "dotenv/config";
import { defineConfig } from "prisma/config";

console.log("DATABASE_URL from env:", process.env["DATABASE_URL"]);

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is undefined!");
  throw new Error("DATABASE_URL environment variable is required for migrations");
}

console.log("✅ DATABASE_URL found:", databaseUrl.substring(0, 20) + "...");

export default defineConfig({
  schema: "prisma/models",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});