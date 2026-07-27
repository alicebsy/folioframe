import { readFile } from "node:fs/promises";
import pg from "pg";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "DATABASE_URL_UNPOOLED 또는 DATABASE_URL 환경변수가 필요합니다.",
  );
  process.exit(1);
}

const schemaUrl = new URL("../db/schema.sql", import.meta.url);
const schema = await readFile(schemaUrl, "utf8");
const client = new pg.Client({
  connectionString,
  ssl: connectionString.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

try {
  await client.connect();
  await client.query(schema);
  console.log("Folioframe 데이터베이스 스키마를 적용했습니다.");
} catch (error) {
  console.error("데이터베이스 스키마 적용에 실패했습니다.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
