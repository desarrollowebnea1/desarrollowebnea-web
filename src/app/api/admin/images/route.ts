import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_MAX_BYTES,
} from "@/lib/api-helpers";

export async function GET() {
  try {
    await requireSession();
    const images = await prisma.imageAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(images);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return jsonError(
        "El almacenamiento de imágenes no está configurado. Configurá BLOB_READ_WRITE_TOKEN en Vercel.",
        503
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return jsonError("Seleccioná un archivo de imagen válido", 400);
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return jsonError("Formato no permitido. Usá JPG, PNG o WEBP.", 400);
    }

    if (file.size > IMAGE_MAX_BYTES) {
      return jsonError("La imagen supera el tamaño máximo de 5 MB.", 400);
    }

    const alt = formData.get("alt");
    const altText =
      typeof alt === "string" && alt.trim() ? alt.trim() : undefined;

    const blob = await put(`images/${Date.now()}-${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const image = await prisma.imageAsset.create({
      data: {
        url: blob.url,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        alt: altText,
      },
    });

    return jsonOk(image, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
