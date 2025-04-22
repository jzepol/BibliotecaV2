# 📚 Biblioteca Popular Antonio E. Agüero – Web Oficial

Este proyecto es una aplicación web para la gestión y difusión de eventos, noticias y asociación de la Biblioteca Popular Antonio Esteban Agüero de Villa Mercedes, San Luis.

---

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
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


##📝 Pendientes / ideas futuras
Envío automático de recordatorios por mail a asociados activos

Institucionalidad https://bibliotecaurquiza.org.ar/bibliotecas-populares/ 

Panel con gestión completa de asociados

Subida de imagen a noticias y eventos

Soporte multiusuario y permisos

Optimización SEO


_________________________
##Estructura del proyecto
BibliotecaV2/
│
├── prisma/
│   └── schema.prisma                  # Definición de modelos Prisma
│
├── public/
│   └── img/
│       └── Fondolineasok.webp         # Fondo decorativo para el formulario
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Layout global (Header + Footer)
│   │   ├── page.tsx                   # Landing principal
│   │   ├── login/page.tsx             # Login de administración
│   │   ├── dashboard/page.tsx         # Panel interno (noticias/eventos)
│   │   ├── asociarse/page.tsx         # Formulario público de asociación
│   │   ├── noticias/page.tsx          # Vista pública de noticias
│   │   ├── eventos/page.tsx           # Vista pública de eventos
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   └── register/route.ts
│   │       ├── noticias/route.ts
│   │       ├── eventos/route.ts
│   │       └── asociados/route.ts
│   │
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Hero.tsx
│   │   ├── forms/
│   │   │   ├── NoticiaForm.tsx
│   │   │   └── EventoForm.tsx
│   │   ├── asociados/
│   │   │   └── AsociadoForm.tsx
│   │   ├── noticias/
│   │   │   └── NoticiaCard.tsx
│   │   └── eventos/
│   │       └── EventosCard.tsx
│   │
│   └── services/
│       ├── auth.ts
│       ├── eventos.ts
│       ├── noticias.ts
│       └── asociados.ts
│
├── .env                               # Config de la base de datos
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md



##Sitio creado y mantenido con ❤️ para la comunidad de la Biblioteca Popular Antonio Esteban Agüero. 
By jzepol