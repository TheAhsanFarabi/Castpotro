"use server";

import { redirect } from "next/navigation";
import { saveUser, findUser } from "./lib/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers"; // <--- Import this

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // Get the wizard data (hidden inputs)
  const level = formData.get("level") as string;
  const interest = formData.get("interest") as string;
  const style = formData.get("style") as string;

  if (!email || !password || !name) {
    return { message: "Please fill in all fields." };
  }

  // 1. Check if user exists
  const existingUser = await findUser(email);
  if (existingUser) {
    return { message: "User already exists. Please login." };
  }

  // 2. Save new user to JSON file
  await saveUser({
    id: randomUUID(),
    name,
    email,
    password, // Note: For a real app, hash this!
    level,
    interest,
    style
  });

  // 3. Redirect to login or home
  // We return success: true to let the UI show the recommendations
  return { success: true };
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await findUser(email);

  if (!user || user.password !== password) {
    return { message: "Invalid email or password" };
  }

  // SET COOKIE
  (await cookies()).set("session", user.id, { httpOnly: true });

  redirect("/profile"); 
}

export async function logoutAction() {
  (await cookies()).delete("session");
  redirect("/login");
}