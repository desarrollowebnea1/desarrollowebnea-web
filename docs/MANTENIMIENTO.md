# Mantenimiento — DESARROLLO WEB NEA

## Variables de entorno necesarias

| Variable | Descripción | Obligatoria |
|----------|-------------|-------------|
| `DATABASE_URL` | Connection string Neon PostgreSQL | ✅ Sí |
| `JWT_SECRET` | Secreto para sesiones admin (mín. 32 chars prod) | ✅ Sí |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob para uploads | ⚠️ Para imágenes |
| `NEXT_PUBLIC_APP_URL` | URL pública (ej. https://desarrollowebnea.com) | ✅ Sí |
| `NODE_ENV` | `production` en Vercel | Auto |

---

## Deploy en Vercel

1. Conectar repositorio GitHub
2. Framework: **Next.js** (auto-detectado)
3. Agregar variables de entorno en Vercel → Settings → Environment Variables
4. Deploy
5. Post-deploy (una vez):
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

## Cambiar contraseña admin

### Opción A — Desde código (recomendado primera vez)

```bash
# Generar hash
node -e "const b=require('bcryptjs'); b.hash('NUEVA_CONTRASEÑA',12).then(console.log)"

# Actualizar en Neon vía Prisma Studio
npm run db:studio
# Tabla User → editar password con el hash generado
```

### Opción B — Re-seed (solo desarrollo)

```bash
npm run db:seed
```

> ⚠️ Nunca uses la contraseña default `admin123456` en producción.

---

## Revisar Vercel

- **Deployments:** verificar último deploy exitoso
- **Logs:** Functions → ver errores de API
- **Analytics:** tráfico y performance
- **Storage → Blob:** verificar imágenes subidas

---

## Revisar Neon

- Dashboard Neon → proyecto → **Tables**
- Verificar conexión activa
- **Backups:** Neon incluye point-in-time recovery
- Monitorear uso de storage y compute

---

## Revisar Vercel Blob

- Vercel → Storage → Blob
- Verificar token `BLOB_READ_WRITE_TOKEN` activo
- Revisar uso y archivos almacenados

---

## Checklist mensual

- [ ] Verificar `/api/health` responde `status: ok`
- [ ] Revisar solicitudes pendientes en admin
- [ ] Verificar links de proyectos activos
- [ ] Revisar imágenes rotas o faltantes
- [ ] Actualizar portfolio si hay proyectos nuevos
- [ ] Revisar logs de errores en Vercel
- [ ] Verificar backup Neon disponible
- [ ] Probar formulario de presupuesto
- [ ] Probar login admin
- [ ] Revisar WhatsApp links funcionando

---

## Qué NO tocar

- `prisma/schema.prisma` — solo si sabés qué estás haciendo
- `src/middleware.ts` — protección admin
- `src/lib/auth.ts` — lógica de sesión
- Variables de entorno en producción sin backup
- `.env` — nunca subir a GitHub

---

## Si falla el admin

1. Verificar `/api/health` — ¿DB conectada?
2. Verificar `JWT_SECRET` configurado en Vercel
3. Limpiar cookies del navegador
4. Reintentar login en `/admin/login`
5. Revisar logs Vercel Functions

---

## Si falla el upload de imágenes

1. Verificar `BLOB_READ_WRITE_TOKEN` en Vercel
2. Verificar formato: JPG, PNG, WEBP
3. Verificar tamaño máx. 5 MB
4. Revisar Storage → Blob en Vercel dashboard

---

## Si falla la base de datos

1. Verificar `DATABASE_URL` en Vercel env vars
2. Verificar Neon project activo (no pausado)
3. Probar conexión: `npx prisma db push`
4. Revisar `/api/health` → `database: false`

---

## Antes de entregar al cliente

- [ ] Cambiar contraseña admin
- [ ] Configurar WhatsApp real
- [ ] Configurar email e Instagram
- [ ] Verificar dominio apuntando a Vercel
- [ ] Ejecutar `npm run qa:check`
- [ ] Probar formulario presupuesto end-to-end
- [ ] Probar consulta estado DWN
- [ ] Verificar mobile en iPhone y Android
- [ ] Completar `docs/QA-ENTREGA.md`

---

*Documento generado: Junio 2026*
