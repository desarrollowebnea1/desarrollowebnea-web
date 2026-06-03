import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";
import { serviceSchema, parseBody } from "@/lib/validations";

export async function GET() {
  try {
    await requireSession();
    const services = await prisma.service.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(services);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(serviceSchema, body);
    const service = await prisma.service.create({ data });
    return jsonOk(service, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
