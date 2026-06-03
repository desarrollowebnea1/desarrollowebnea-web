#!/usr/bin/env node
/**
 * QA Check — DESARROLLO WEB NEA
 * Verificación básica pre-entrega
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
let passed = 0;
let failed = 0;
const errors = [];

function check(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}`);
    errors.push(`${name}: ${e.message}`);
    failed++;
  }
}

console.log("\n🔍 QA Check — DESARROLLO WEB NEA\n");

check("Archivo .env.example existe", () => {
  if (!fs.existsSync(path.join(ROOT, ".env.example"))) throw new Error("No encontrado");
});

check("Variables requeridas documentadas", () => {
  const env = fs.readFileSync(path.join(ROOT, ".env.example"), "utf8");
  for (const v of ["DATABASE_URL", "JWT_SECRET", "BLOB_READ_WRITE_TOKEN"]) {
    if (!env.includes(v)) throw new Error(`Falta ${v}`);
  }
});

check("Schema Prisma existe", () => {
  if (!fs.existsSync(path.join(ROOT, "prisma", "schema.prisma"))) throw new Error("No encontrado");
});

check("Seed existe", () => {
  if (!fs.existsSync(path.join(ROOT, "prisma", "seed.ts"))) throw new Error("No encontrado");
});

check("Health endpoint existe", () => {
  if (!fs.existsSync(path.join(ROOT, "src", "app", "api", "health", "route.ts"))) {
    throw new Error("No encontrado");
  }
});

check("Documentación de entrega existe", () => {
  for (const doc of ["QA-ENTREGA.md", "MANTENIMIENTO.md", "ENTREGA-CLIENTE.md"]) {
    if (!fs.existsSync(path.join(ROOT, "docs", doc))) throw new Error(`Falta docs/${doc}`);
  }
});

check("Admin login page existe", () => {
  if (!fs.existsSync(path.join(ROOT, "src", "app", "admin", "login", "page.tsx"))) {
    throw new Error("No encontrado");
  }
});

check("Prisma client generado", () => {
  const clientPath = path.join(ROOT, "node_modules", ".prisma", "client");
  if (!fs.existsSync(clientPath)) throw new Error("Ejecutar: npx prisma generate");
});

check("TypeScript compila (next build)", () => {
  execSync("npm run build", { cwd: ROOT, stdio: "pipe", env: { ...process.env, CI: "true" } });
});

if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost")) {
  check("Conexión DB (opcional)", () => {
    execSync("npx prisma db execute --stdin", {
      cwd: ROOT,
      input: "SELECT 1;",
      stdio: "pipe",
    });
  });
} else {
  console.log("⏭️  Conexión DB — omitido (DATABASE_URL no configurada o local)");
}

console.log(`\n📊 Resultado: ${passed} OK, ${failed} FAIL\n`);

if (failed > 0) {
  errors.forEach((e) => console.log(`  • ${e}`));
  process.exit(1);
}

console.log("✅ QA check completado\n");
process.exit(0);
