import { Prisma } from "@prisma/client";

export const SLUG_DUPLICATE_MESSAGE =
  "Ya existe un registro con ese slug. Elegí otro identificador único.";

export function isPrismaUniqueError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function emptyUrlToNull(value?: string | null): string | null | undefined {
  if (value === "") return null;
  return value;
}
