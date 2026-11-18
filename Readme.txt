# Top 10 OST 🎮

**Ranking colaborativo de bandas sonoras de videojuegos.**

Top 10 OST es una aplicación web que permite a los aficionados a la música de videojuegos escuchar, descubrir, calificar y compartir bandas sonoras (OST). La plataforma cuenta con un ranking dinámico que se actualiza según las calificaciones de la comunidad.

## Descripción del proyecto

El proyecto busca ofrecer un espacio especializado donde los usuarios puedan encontrar música de videojuegos, escuchar canciones, consultar sus compositores y compartir sus propias bandas sonoras.

A diferencia de un ranking tradicional, el Top 10 permite que las calificaciones de los usuarios influyan en las posiciones, combinando las canciones originales con los aportes de la comunidad.

## Tecnologías utilizadas

- **React 19:** estructura de la aplicación.
- **Vite 6:** herramienta de desarrollo y compilación.
- **HTML5:** estructura de las páginas.
- **CSS3:** diseño y estilos visuales.
- **JavaScript:** funcionalidades e interactividad.
- **Supabase:** servicio backend.
- **PostgreSQL:** almacenamiento de información.
- **Supabase Auth:** registro e inicio de sesión.
- **Supabase Storage:** almacenamiento de canciones y portadas.
- **Git y GitHub:** control de versiones.
- **Netlify y GitHub Pages:** publicación de la aplicación.

## Funcionalidades principales

1. **Registro e inicio de sesión:** permite crear una cuenta utilizando usuario y contraseña, sin solicitar correo electrónico al usuario.
2. **Top 10:** muestra las diez canciones mejor posicionadas según las calificaciones de la comunidad.
3. **Explorar:** permite consultar el catálogo original y las canciones compartidas por otros usuarios.
4. **Reproductor de música:** permite reproducir, pausar, controlar el volumen y consultar el progreso de las canciones.
5. **Subir canciones:** los usuarios registrados pueden publicar canciones MP3 con su respectiva portada.
6. **Calificaciones y comentarios:** permite calificar canciones de 1 a 5 estrellas y publicar comentarios.

## Tipos de usuarios

- **Visitante:** puede consultar el Top 10, explorar canciones, reproducir música y leer comentarios y calificaciones.
- **Usuario registrado:** puede realizar las acciones de un visitante, además de subir canciones, calificarlas y publicar comentarios.
- **Administrador:** gestiona la base de datos, el almacenamiento y las políticas de seguridad desde Supabase.

## Instalación y ejecución local

Para ejecutar el proyecto en un entorno local es necesario tener instalado Node.js y Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/sans27y/Top_10.git
```

### 2. Ingresar a la carpeta

```bash
cd Top_10
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo y mostrará la dirección local para acceder a la aplicación desde el navegador.

### 5. Compilar para producción

```bash
npm run build
```

El comando genera la versión de producción dentro de la carpeta `dist`.

## Configuración de Supabase

El proyecto utiliza Supabase como servicio backend para gestionar la autenticación, la base de datos y el almacenamiento.

Para configurar el backend:

1. Crear o acceder a un proyecto en Supabase.
2. Abrir el apartado SQL Editor.
3. Ejecutar el archivo `MIGRACION_SUPABASE.sql` incluido en el repositorio.
4. Ingresar a Authentication y acceder a los proveedores de autenticación.
5. Mantener habilitado Email y desactivar la confirmación de correo electrónico.
6. Verificar que las políticas RLS y los buckets de almacenamiento estén configurados correctamente.

**Seguridad:** la aplicación utiliza una clave pública de Supabase. Las operaciones y los permisos de los usuarios están protegidos mediante políticas RLS. Nunca se deben publicar claves privadas ni claves `service_role`.

El proyecto no requiere un archivo `.env` para su configuración actual.

## Estructura del proyecto

```text
Top_10/
├── public/
│   └── legacy/
│       ├── sonidos/
│       └── archivos originales de la aplicación
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   └── workflows/
├── MIGRACION_SUPABASE.sql
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

## Enlaces del proyecto

- **Repositorio GitHub:** https://github.com/sans27y/Top_10
- **Aplicación publicada en Netlify:** https://splendid-semolina-20c1eb.netlify.app

## Pruebas

Se realizaron verificaciones de funcionamiento sobre los principales módulos de la aplicación, incluyendo autenticación, reproducción de audio, calificaciones, comentarios y publicación de canciones.

Se ejecutaron pruebas en los navegadores Google Chrome, Microsoft Edge y Mozilla Firefox.

## Alcance del proyecto

La primera versión contempla el registro de usuarios, inicio de sesión, consulta del ranking, exploración de canciones, reproducción de audio, publicación de canciones, calificaciones y comentarios.

Entre las funcionalidades que podrían incorporarse en futuras versiones se encuentran la búsqueda avanzada, las listas de reproducción, la moderación de contenido y la edición o eliminación de canciones.

## Integrantes

- David Leonardo Quiroga Legarda
- Santiago Calderón Lozano
- Santiago Puentes Prieto
- Natalia Jiménez Palechor

**Universidad ECCI**

Ingeniería de Sistemas

Desarrollo de Aplicaciones Web

Docente: Hernán Darío Cruz Enciso

Bogotá D.C., Colombia – 2026

---

**Top 10 OST – La música de los videojuegos, elegida por la comunidad.**
