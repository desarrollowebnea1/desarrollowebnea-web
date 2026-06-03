import { APP_NAME } from "@/lib/constants";
import { checkDatabaseConnection } from "@/lib/db-helpers";
import { jsonOk } from "@/lib/api-response";

export async function GET() {
  const database = await checkDatabaseConnection();
  return jsonOk({
    status: database ? "ok" : "degraded",
    app: APP_NAME,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
    database,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
}
