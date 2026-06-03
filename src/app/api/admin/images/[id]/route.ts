import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";

type RouteContext = { params: { id: string } };

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const existing = await prisma.imageAsset.findUnique({
      where: { id: params.id },
    });
    if (!existing) {
      return jsonError("Imagen no encontrada", 404);
    }

    await prisma.imageAsset.delete({ where: { id: params.id } });
    return jsonOk({ message: "Imagen eliminada correctamente", id: params.id });
  } catch (error) {
    return handleApiError(error);
  }
}
