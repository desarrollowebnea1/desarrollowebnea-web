import { requireSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    await requireSession();
    const stats = await getDashboardStats();
    return jsonOk(stats);
  } catch (error) {
    return handleApiError(error);
  }
}
