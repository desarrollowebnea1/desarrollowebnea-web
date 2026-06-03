# DESARROLLO WEB NEA — Web Oficial

Web ultra premium autoadministrable para **DESARROLLO WEB NEA**. Portfolio, servicios, precios, formulario de presupuesto, WhatsApp y panel admin completo.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + Neon PostgreSQL
- Vercel + Vercel Blob
- JWT httpOnly + bcrypt

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables
cp .env.example .env
# Editar DATABASE_URL, JWT_SECRET, BLOB_READ_WRITE_TOKEN

# 3. Base de datos
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

**Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

- Email: `admin@desarrollowebnea.com`
- Password: `admin123456`

> ⚠️ Cambiar contraseña antes de publicar en producción.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor producción |
| `npm run db:push` | Sincronizar schema con Neon |
| `npm run db:seed` | Cargar datos iniciales |
| `npm run db:studio` | Prisma Studio |
| `npm run qa:check` | Verificación pre-entrega |

## Variables de entorno

Ver `.env.example`:

- `DATABASE_URL` — Neon PostgreSQL
- `JWT_SECRET` — Secreto JWT (mín. 32 chars en producción)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob (uploads)
- `NEXT_PUBLIC_APP_URL` — URL pública de la app

## Deploy en Vercel

1. Conectar repo GitHub
2. Agregar variables de entorno
3. Deploy automático
4. Ejecutar `npx prisma db push` y `npm run db:seed` contra Neon

## Documentación

- [docs/ENTREGA-CLIENTE.md](docs/ENTREGA-CLIENTE.md)
- [docs/MANTENIMIENTO.md](docs/MANTENIMIENTO.md)
- [docs/QA-ENTREGA.md](docs/QA-ENTREGA.md)

## Health check

`GET /api/health` — estado de app, DB y Blob.

## Licencia

Proyecto privado — DESARROLLO WEB NEA © 2026
