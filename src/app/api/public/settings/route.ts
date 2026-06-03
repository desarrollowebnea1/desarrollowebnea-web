import { getSiteSettings } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
