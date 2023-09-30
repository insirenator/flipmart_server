import { nanoid } from "nanoid";

import { User } from "../schemas/user.schema";
import pool from "./db";

export async function insertUser(user: User) {
  const uid = nanoid(); // Generate unique ID
  const result = await pool.query(
    "INSERT INTO users(id, name, email, address, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, address, role, created_at",
    [uid, user.name, user.email, user.address, user.password]
  );

  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await pool.query(
    "SELECT id, name, email, password, address, role, verified, enabled, created_at FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

export async function updateUserVerificationStatus(id: string) {
  await pool.query("UPDATE users SET verified = true WHERE id = ($1)", [id]);
}
