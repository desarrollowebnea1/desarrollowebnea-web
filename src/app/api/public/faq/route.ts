import { getPublicFaqs } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const faq = await getPublicFaqs();
    return jsonOk(faq);
  } catch (error) {
    return handleApiError(error);
  }
}
