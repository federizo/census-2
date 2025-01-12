"use server";
import { createSupbaseServerClientReadOnly } from "../supabase";
import { cookies } from "next/headers";
import { createSupbaseServerClient } from "../supabase";

export async function readUserSession() {
  const supabase = await createSupbaseServerClientReadOnly();

  return supabase.auth.getSession();
}

export async function removeCookies() {
  const cookieStore = cookies();
  cookieStore.delete("session");
  const supabase = await createSupbaseServerClient();
  await supabase.auth.signOut();
}
