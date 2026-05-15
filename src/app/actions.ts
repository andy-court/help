"use server";

import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

export async function submitContactForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return { success: false, error: "Input too long." };
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  if (error) {
    return { success: false, error: "Failed to submit." };
  }

  return { success: true };
}
