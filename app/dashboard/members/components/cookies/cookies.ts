"use server";
import { cookies } from "next/headers";

export default async function getServerSideCookies() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get("session");
  return myCookie?.value; // Returns the value of the cookie
}
