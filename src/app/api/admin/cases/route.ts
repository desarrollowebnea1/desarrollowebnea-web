import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import {
  caseStudySchema,
  parseBody,
  parseStringArray,
} from "@/lib/validations";
import {
  isPrismaUniqueError,
  SLUG_DUPLICATE_MESSAGE,
  emptyUrlToNull,
} from "@/lib/api-helpers";

export async function GET() {
  try {
    await requireSession();
    const cases = await prisma.caseStudy.findMany({
      include: { project: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(cases);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const raw = await request.json();
    const body = {
      ...raw,
      features: parseStringArray(raw?.features),
      technologies: parseStringArray(raw?.technologies),
    };
    const data = parseBody(caseStudySchema, body);

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...data,
        projectId: data.projectId || null,
        webUrl: emptyUrlToNull(data.webUrl) ?? undefined,
      },
      include: { project: true },
    });
    return jsonOk(caseStudy, 201);
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return jsonError(SLUG_DUPLICATE_MESSAGE, 409);
    }
    return handleApiError(error);
  }
}
