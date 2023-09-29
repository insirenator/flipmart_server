import { Pool } from "pg";
import { config } from "dotenv";
config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export default pool;

// {
//   host: "localhost",
//   user: "postgres",
//   database: "FlipMart",
//   password: "POSTgres@149",
//   port: 5432,
// }
