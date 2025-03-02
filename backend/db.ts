import { Pool } from "pg";
import { configDotenv } from "dotenv";

configDotenv();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false }
});

export default pool;
