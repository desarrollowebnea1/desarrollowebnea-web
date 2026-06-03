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

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: params.id },
      include: { project: true },
    });
    if (!caseStudy) {
      return jsonError("Caso de estudio no encontrado", 404);
    }
    return jsonOk(caseStudy);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const raw = await request.json();
    const body = {
      ...raw,
      features: parseStringArray(raw?.features),
      technologies: parseStringArray(raw?.technologies),
    };
    const data = parseBody(caseStudySchema, body);

    const caseStudy = await prisma.caseStudy.update({
      where: { id: params.id },
      data: {
        ...data,
        projectId: data.projectId || null,
        webUrl: emptyUrlToNull(data.webUrl) ?? undefined,
      },
      include: { project: true },
    });
    return jsonOk(caseStudy);
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return jsonError(SLUG_DUPLICATE_MESSAGE, 409);
    }
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const caseStudy = await prisma.caseStudy.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Caso de estudio desactivado", caseStudy });
  } catch (error) {
    return handleApiError(error);
  }
}
