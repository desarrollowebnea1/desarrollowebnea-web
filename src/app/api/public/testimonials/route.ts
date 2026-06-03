import { getPublicTestimonials } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const testimonials = await getPublicTestimonials();
    return jsonOk(testimonials);
  } catch (error) {
    return handleApiError(error);
  }
}
