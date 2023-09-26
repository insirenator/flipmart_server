import { User } from "../schemas/user.schema";
import pool from "./db";

export async function insertUser(user: User) {
  const result = await pool.query(
    "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.name, user.email, user.password]
  );

  return result.rows;
}

export async function getUserByEmail(email: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows;
}
