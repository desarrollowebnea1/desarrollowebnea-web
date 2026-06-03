import { clearSessionCookieOptions } from "@/lib/auth";
import { jsonOk } from "@/lib/api-response";

export async function POST() {
  const response = jsonOk({ message: "Sesión cerrada correctamente" });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}
