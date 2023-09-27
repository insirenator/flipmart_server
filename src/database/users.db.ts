import { nanoid } from "nanoid";

import { User } from "../schemas/user.schema";
import pool from "./db";

export async function insertUser(user: User) {
  const uid = nanoid(); // Generate unique ID
  const result = await pool.query(
    "INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, createdat",
    [uid, user.name, user.email, user.password]
  );

  return result.rows;
}

export async function getUserByEmail(email: string) {
  const result = await pool.query(
    "SELECT id, name, email, password, role, enabled, createdat FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}
