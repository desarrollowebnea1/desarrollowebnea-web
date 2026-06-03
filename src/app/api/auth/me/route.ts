import { getSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) {
      return jsonError("Sesión no válida. Iniciá sesión nuevamente.", 401);
    }
    return jsonOk({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
