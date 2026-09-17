import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/** ใช้ในหน้าที่ต้องล็อกอิน ถ้าไม่มี session จะพาไป /sign-in */
export async function verifySession() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}

/** ใช้ใน Server Action: คืน id ของผู้ใช้ที่ล็อกอินอยู่ หรือ null ถ้ายังไม่ล็อกอิน */
export async function getCurrentUserId() {
  const session = await getSession();
  return session?.user.id ?? null;
}
