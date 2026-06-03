import { getPublicPlans } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const plans = await getPublicPlans();
    return jsonOk(plans);
  } catch (error) {
    return handleApiError(error);
  }
}
