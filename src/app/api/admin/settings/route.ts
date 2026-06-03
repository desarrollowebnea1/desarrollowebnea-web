import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";
import { settingsSchema, parseBody } from "@/lib/validations";

export async function GET() {
  try {
    await requireSession();
    const settings = await prisma.siteSettings.findFirst();
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(settingsSchema, body);

    const existing = await prisma.siteSettings.findFirst();

    const settings = existing
      ? await prisma.siteSettings.update({
          where: { id: existing.id },
          data,
        })
      : await prisma.siteSettings.create({ data });

    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
