import { getPublicProjects } from "@/lib/db-helpers";
import { jsonOk, handleApiError } from "@/lib/api-response";

export async function GET() {
  try {
    const projects = await getPublicProjects();
    return jsonOk(projects);
  } catch (error) {
    return handleApiError(error);
  }
}
