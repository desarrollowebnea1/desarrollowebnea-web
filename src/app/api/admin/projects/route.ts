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

export async function GET() {
  try {
    await requireSession();
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(projects);
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
      technologies: parseStringArray(raw?.technologies),
      features: parseStringArray(raw?.features),
    };
    const data = parseBody(projectSchema, body);

    const project = await prisma.project.create({
      data: {
        ...data,
        webUrl: emptyUrlToNull(data.webUrl) ?? undefined,
      },
    });
    return jsonOk(project, 201);
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return jsonError(SLUG_DUPLICATE_MESSAGE, 409);
    }
    return handleApiError(error);
  }
}
