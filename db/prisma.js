const dotenv = require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const db_URL = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

if (!db_URL) {
  throw new Error("CRITICAL: No database environment variables detected.");
}
console.log(db_URL);

const pool = new Pool({ connectionString: db_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
