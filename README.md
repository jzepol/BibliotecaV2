# 📚 Biblioteca Popular Antonio E. Agüero – Web Oficial

Este proyecto es una aplicación web moderna para la gestión y difusión de eventos, noticias y asociación de la Biblioteca Popular Antonio Esteban Agüero de Villa Mercedes, San Luis.

## 🌟 Características Principales

- Sistema completo de gestión de biblioteca
- Panel administrativo intuitivo
- Gestión de asociados y membresías
- Publicación de noticias y eventos
- Formulario de asociación inteligente
- Optimización SEO
- Diseño responsivo y accesible
- Integración con Cloudinary para gestión de imágenes
- [ ] Sistema de reserva de libros

## 🚀 Tecnologías

### Frontend
- [Next.js 15](https://nextjs.org/) - Framework React moderno
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [React Icons](https://react-icons.github.io/react-icons/) - Iconografía
- [React Dropzone](https://react-dropzone.js.org/) - Manejo de archivos

### Backend
- [Prisma ORM](https://www.prisma.io/) - ORM moderno
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [JWT](https://jwt.io/) - Autenticación
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js) - Encriptación
- [Cloudinary](https://cloudinary.com/) - Gestión de imágenes

### Herramientas de Desarrollo
- ESLint - Linting
- TypeScript - Tipado estático
- Next-Sitemap - Generación de sitemap

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd bibliotecav2
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
JWT_SECRET=clave_supersecreta
CLOUDINARY_CLOUD_NAME=nombre_cloud
CLOUDINARY_API_KEY=clave
CLOUDINARY_API_SECRET=secreto
```

4. Inicializa la base de datos:
```bash
npx prisma migrate dev --name init
```

## 🚀 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter
npx prisma studio    # Abre la interfaz visual de Prisma
```
    SELECT setval(pg_get_serial_sequence('public."Prestamo"', 'id'), COALESCE((SELECT MAX(id) FROM public."Prestamo"), 0) + 1, false);
## 📁 Estructura del Proyecto

```
BIBLIOTECAV2/
├── prisma/                        # Esquema y migraciones Prisma
├── public/                        # Archivos estáticos
├── src/
│   ├── app/                       # Rutas con App Router
│   ├── components/                # Componentes reutilizables
│   ├── services/                  # Servicios y lógica de negocio
│   ├── styles/                    # Estilos CSS
│   └── lib/                       # Utilidades y configuraciones
├── .env                           # Variables de entorno
└── [archivos de configuración]
```

## 🔐 Autenticación y Seguridad

- Sistema de autenticación basado en JWT
- Encriptación de contraseñas con bcrypt
- Middleware de protección de rutas
- Validación de datos en formularios
- Manejo seguro de archivos

## 📱 Características del Dashboard

- Gestión completa de asociados
- Publicación de noticias y eventos
- Subida y gestión de imágenes
- Sistema de permisos por usuario
- Exportación de datos a Excel
- Gestión de talleres y actividades

## 🔄 Próximas Mejoras
- [ ] Persistencia en el login
- [🆗] Sistema de reserva de libros (pendiente cambiar el buscador de libros y usuarios, arreglar el devolucion )
- [🆗] Catálogo digital de libros
- [ ] Integración con MercadoPago para pagos de membresía
- [ ] Sistema de notificaciones por email
- [ ] Recordatorios automáticos de vencimiento de libros
- [ ] Panel de estadísticas y reportes


## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autores

- **jzepol** - *Desarrollo y mantenimiento*

## 🙏 Agradecimientos

- Biblioteca Popular Antonio Esteban Agüero
- Comunidad de Villa Mercedes
- Contribuidores y colaboradores

---

Sitio creado y mantenido con ❤️ para la comunidad de la Biblioteca Popular Antonio Esteban Agüero.