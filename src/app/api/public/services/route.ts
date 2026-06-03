import { getPublicServices } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const services = await getPublicServices();
    return jsonOk(services);
  } catch (error) {
    return handleApiError(error);
  }
}
