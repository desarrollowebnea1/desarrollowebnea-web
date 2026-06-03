import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { testimonialSchema, parseBody } from "@/lib/validations";

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });
    if (!testimonial) {
      return jsonError("Testimonio no encontrado", 404);
    }
    return jsonOk(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(testimonialSchema, body);
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data,
    });
    return jsonOk(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Testimonio desactivado", testimonial });
  } catch (error) {
    return handleApiError(error);
  }
}
