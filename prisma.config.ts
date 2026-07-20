import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const db_URL =
  process.env.NODE_ENV === "production" ? "DIRECT_URL" : "LOCAL_DATABASE_URL";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env(db_URL),
  },
});
