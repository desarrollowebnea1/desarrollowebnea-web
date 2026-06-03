import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";
import { faqSchema, parseBody } from "@/lib/validations";

export async function GET() {
  try {
    await requireSession();
    const faq = await prisma.faq.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(faq);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(faqSchema, body);
    const item = await prisma.faq.create({ data });
    return jsonOk(item, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
