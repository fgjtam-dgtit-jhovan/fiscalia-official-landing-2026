# Landing institucional de Fiscalía ficticia

Landing page institucional creada con Next.js 14, TypeScript, Tailwind CSS, Prisma y MySQL vía Docker.

## Privacidad

Todos los nombres, boletines, fechas, ubicaciones, recompensas y notas son ficticios. Las imágenes personales son placeholders locales con la leyenda `FOTO DE REFERENCIA` para evitar representar o exponer personas reales.

## Ejecutar

1. Copia `.env.example` a `.env` y ajusta credenciales.
2. Instala dependencias con `npm install`.
3. Levanta MySQL con `docker compose up mysql -d`.
4. Ejecuta `npm run db:push`.
5. Crea datos demo con `npm run db:seed`.
6. Inicia la app con `npm run dev`.

## Administracion

El panel administrativo esta en `/admin`.

Credenciales demo:

- Correo: `admin@fgj.example`
- Contrasena: `Admin2026!`

Desde el panel se pueden crear usuarios administrativos, boletines de busqueda, recompensas, comunicados de prensa y registros de `se buscan`. Para que los formularios persistan cambios, MySQL debe estar activo y Prisma debe estar sincronizado con `npm run db:push`.

También puedes construir todo con:

```bash
docker compose up --build
```
