import { getPublicCaseStudies } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const cases = await getPublicCaseStudies();
    return jsonOk(cases);
  } catch (error) {
    return handleApiError(error);
  }
}
