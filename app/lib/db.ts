import fs from 'fs/promises';
import path from 'path';

// Define the path to our JSON "database"
const DB_PATH = path.join(process.cwd(), 'data.json');

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, never store plain text passwords!
  level?: string;
  interest?: string;
  style?: string;
};

// Helper to read data
export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper to save a user
export async function saveUser(user: User) {
  const users = await getUsers();
  users.push(user);
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

// Helper to find a user
export async function findUser(email: string) {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}