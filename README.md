# 📚 Biblioteca Popular Antonio E. Agüero – Web Oficial

Este proyecto es una aplicación web para la gestión y difusión de eventos, noticias y asociación de la Biblioteca Popular Antonio Esteban Agüero de Villa Mercedes, San Luis.

---

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS]
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- Autenticación con JWT

---

## 📁 Estructura principal

src/ ├── app/ # Páginas con App Router ├── components/ # Componentes reutilizables ├── services/ # Conexiones a Prisma public/ # Archivos estáticos prisma/ # Modelos y migraciones


---

## 🧠 Funcionalidades

- ✅ Sistema de login/register (solo backend)
- ✅ Dashboard interno para publicar Noticias y Eventos
- ✅ Sección pública de Noticias y Eventos
- ✅ Formulario de Asociación con campos condicionales
- ✅ Sistema modular y escalable
- ✅ Estilo institucional basado en identidad visual
- ✅ Institucionalidad https://bibliotecaurquiza.org.ar/bibliotecas-populares/ 
- ✅ Panel con gestión completa de asociados
- ✅ Subida de imagen a noticias y eventos
- ✅ Soporte multiusuario y permisos
- ✅ Optimización SEO
---

## 🛠️ Scripts útiles

```bash
npm install          # Instala las dependencias
npm run dev          # Inicia el servidor en desarrollo
npx prisma migrate dev --name init    # Aplica migraciones
npx prisma studio    # Accede visualmente a la base de dato

## necesarias
npm install -D typescript @types/react @types/node
npm install -D prisma
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint eslint-config-next
npm install -D react-icons
npm install jsonwebtoken
npm install bcrypt
npm install --save-dev @types/file-saver

## 🔐 Variables necesarias (.env)

DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
JWT_SECRET=clave_supersecreta
CLOUDINARY_CLOUD_NAME=nombre_cloud
CLOUDINARY_API_KEY=clave
CLOUDINARY_API_SECRET=secreto


##📝 Pendientes / ideas futuras
Envío automático de recordatorios de pago por mail a asociados activos





_________________________
##Estructura del proyecto
BIBLIOTECAV2/
├── prisma/                        # Esquema y migraciones Prisma
│   ├── schema.prisma
│   └── migrations/
│
├── public/                        # Archivos estáticos
│   └── img/
│       ├── logos, iconos, fondo, etc.
│
├── src/
│   ├── app/                       # Rutas con App Router
│   │   ├── login/                 # Página de inicio de sesión
│   │   ├── dashboard/            # Panel administrativo
│   │   ├── asociarse/            # Formulario público de socios
│   │   ├── noticias/             # Página de noticias
│   │   ├── eventos/              # Página de eventos
│   │   ├── talleres/             # Página de talleres
│   │   ├── institucionalidad/
│   │   │   ├── bibliotecas-populares/
│   │   │   ├── comision-directiva/
│   │   │   ├── horarios/
│   │   │   ├── infantil/
│   │   │   └── rincon-julia/
│   │   └── api/                  # Rutas API REST
│   │       ├── auth/             # Login y registro
│   │       │   ├── login/
│   │       │   └── register/
│   │       ├── asociados/        # Gestión de socios
│   │       ├── eventos/          # Gestión de eventos
│   │       ├── noticias/         # Gestión de noticias
│   │       ├── talleres/         # Gestión de talleres
│   │       └── upload/           # Subida de imágenes
│
│   ├── components/               # Componentes reutilizables
│   │   ├── dashboard/
│   │   ├── eventos/
│   │   ├── forms/
│   │   ├── asociados/
│   │   ├── noticias/
│   │   └── landing/
│
│   ├── services/                 # Acceso a datos con Prisma
│   │   ├── auth.ts
│   │   ├── asociados.ts
│   │   ├── eventos.ts
│   │   ├── noticias.ts
│   │   └── talleres.ts
│
│   ├── styles/                   # CSS modularizado
│   │   └── *.css
│
│   └── lib/                      # Utilidades generales
│       ├── cloudinary.ts
│       ├── getUserFromToken.ts
│       ├── prisma.ts
│       └── withAuth.ts
│
├── .env                          # Variables de entorno
├── next.config.ts                # Configuración Next.js
├── middleware.ts                 # Middleware de autenticación
├── tsconfig.json                 # Configuración TypeScript
├── package.json
└── README.md



##Sitio creado y mantenido con ❤️ para la comunidad de la Biblioteca Popular Antonio Esteban Agüero. 
By jzepol