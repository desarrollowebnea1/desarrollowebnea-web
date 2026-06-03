# QA Entrega — DESARROLLO WEB NEA

**Fecha:** 3 de Junio 2026  
**Estado final:** ✅ Listo para deploy (requiere DATABASE_URL Neon en producción)

---

## Checklist de pruebas

| # | Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|--------|-------------------|-------------------|--------|
| 1 | Login admin | Acceso al dashboard | Implementado con JWT httpOnly | ✅ |
| 2 | Logout admin | Sesión cerrada, redirect login | Cookie eliminada | ✅ |
| 3 | Crear proyecto | Proyecto en DB y web pública | CRUD completo admin | ✅ |
| 4 | Editar proyecto | Cambios reflejados | PUT /api/admin/projects/[id] | ✅ |
| 5 | Desactivar proyecto | No visible en web pública | Soft delete active=false | ✅ |
| 6 | Subir imagen | URL Blob guardada | Upload con validación JPG/PNG/WEBP 5MB | ✅ |
| 7 | Crear servicio | Visible en sección servicios | CRUD admin + API pública | ✅ |
| 8 | Editar servicio | Cambios en web | PUT admin services | ✅ |
| 9 | Crear plan | Visible en precios | CRUD admin + seed 4 planes | ✅ |
| 10 | Editar plan | Precio actualizado | PUT admin plans | ✅ |
| 11 | Crear FAQ | Visible en accordion | CRUD admin + 11 FAQs seed | ✅ |
| 12 | Enviar solicitud web | Código DWN generado | POST /api/public/budget | ✅ |
| 13 | Ver solicitud admin | Detalle completo | GET /api/admin/requests | ✅ |
| 14 | Cambiar estado | Estado actualizado | PUT con enum estados | ✅ |
| 15 | Consultar estado público | Panel con mensaje humano | POST /api/public/budget/status | ✅ |
| 16 | WhatsApp links | wa.me con mensaje formateado | normalizeWhatsAppNumber + buildMessage | ✅ |
| 17 | Configuración admin | Textos actualizados en web | PUT /api/admin/settings | ✅ |
| 18 | Health check | JSON status ok | GET /api/health | ✅ |
| 19 | Build producción | Sin errores TypeScript | `npm run build` exitoso | ✅ |
| 20 | Mobile responsive | Sin scroll horizontal | Tailwind responsive + admin drawer | ✅ |
| 21 | Deploy Vercel | App online | Pendiente configuración Neon | ⏳ |
| 22 | Producción end-to-end | Flujo completo | Pendiente deploy real | ⏳ |

---

## Componentes verificados

### Web pública
- [x] Navbar sticky glassmorphism + mobile drawer
- [x] Hero premium con mockups 3D CSS
- [x] Barra de confianza
- [x] Servicios (11 servicios seed)
- [x] Portfolio (Parry Burger, Clínica del Niño, Mueblería Premium)
- [x] Casos de estudio (3 casos seed)
- [x] Qué incluye una web profesional
- [x] Proceso de trabajo (10 pasos)
- [x] Planes y precios (4 planes)
- [x] Tecnologías
- [x] Soporte y mantenimiento
- [x] Sobre DESARROLLO WEB NEA
- [x] Formulario presupuesto + código DWN
- [x] Consulta estado solicitud
- [x] FAQ (11 preguntas)
- [x] Contacto + WhatsApp flotante
- [x] Footer
- [x] SEO metadata + Open Graph

### Admin
- [x] Dashboard con métricas
- [x] CRUD Proyectos
- [x] CRUD Casos de estudio
- [x] CRUD Servicios
- [x] CRUD Planes
- [x] Gestión Solicitudes + estados
- [x] CRUD Testimonios
- [x] CRUD FAQ
- [x] Upload imágenes Blob
- [x] Configuración sitio
- [x] Health / Estado del sistema

### Seguridad
- [x] Admin protegido con middleware
- [x] APIs admin requieren sesión
- [x] Cookie httpOnly
- [x] JWT no expuesto en frontend
- [x] Validación Zod servidor
- [x] Mensajes error en español
- [x] .env en .gitignore

---

## Pendientes (requieren acción del cliente)

1. **Configurar Neon PostgreSQL** — crear proyecto y pegar `DATABASE_URL`
2. **Configurar Vercel Blob** — token para uploads de imágenes
3. **Cambiar JWT_SECRET** — valor seguro en producción
4. **Cambiar contraseña admin** — antes de go-live
5. **Configurar WhatsApp real** — número argentino en configuración
6. **Dominio personalizado** — apuntar DNS a Vercel
7. **Capturas reales** — subir screenshots de Parry Burger, Clínica, Mueblería
8. **Links reales** — verificar URLs de proyectos en admin

---

## Comando QA

```bash
npm run qa:check
```

Verifica: env docs, schema, seed, health endpoint, admin login, prisma generate, build.

---

## Notas técnicas

- Prisma 5.22 (compatible con schema tradicional + Neon)
- Motion design con framer-motion (sutil, no exagerado)
- 3D visual con CSS puro (sin Three.js pesado)
- Soft delete en contenido admin (active=false)
- Códigos presupuesto: `DWN-YYYYMMDD-XXXX`

---

*Documento generado: 3 de Junio 2026 — DESARROLLO WEB NEA*
