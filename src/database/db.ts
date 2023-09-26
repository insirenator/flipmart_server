import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "FlipMart",
  password: "POSTgres@149",
  port: 5432,
});

export default pool;
