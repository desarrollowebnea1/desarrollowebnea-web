import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";
import { testimonialSchema, parseBody } from "@/lib/validations";

export async function GET() {
  try {
    await requireSession();
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(testimonials);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(testimonialSchema, body);
    const testimonial = await prisma.testimonial.create({ data });
    return jsonOk(testimonial, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
