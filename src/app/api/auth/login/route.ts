import {
  authenticateUser,
  createSession,
  sessionCookieOptions,
} from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { loginSchema, parseBody } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = parseBody(loginSchema, body);
    const user = await authenticateUser(data.email, data.password);
    if (!user) {
      return jsonError("Email o contraseña incorrectos", 401);
    }
    const token = await createSession(user);
    const response = jsonOk({ user });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
