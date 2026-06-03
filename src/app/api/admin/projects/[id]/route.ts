import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import {
  projectSchema,
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
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { caseStudies: true },
    });
    if (!project) {
      return jsonError("Proyecto no encontrado", 404);
    }
    return jsonOk(project);
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
      technologies: parseStringArray(raw?.technologies),
      features: parseStringArray(raw?.features),
    };
    const data = parseBody(projectSchema, body);

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...data,
        webUrl: emptyUrlToNull(data.webUrl) ?? undefined,
      },
    });
    return jsonOk(project);
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
    const project = await prisma.project.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Proyecto desactivado", project });
  } catch (error) {
    return handleApiError(error);
  }
}
