import bcrypt from "bcrypt";

export async function hashString(data: string) {
  return await bcrypt.hash(data, 10);
}

export async function compareHash(data: string, hashedData: string) {
  return await bcrypt.compare(data, hashedData);
}
