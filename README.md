# 📌 Proyecto MFE-breeds

Este proyecto es una solución integral basada en una arquitectura de **Micro frontends (*MFE*)** utilizando **Single SPA** como orquestador para integrar aplicaciones desarrolladas en **Angular 14** y **React 18** , junto con un backend robusto desarrollado en **Nest.js** y persistencia en **MongoDB**.

## 🏗️ Arquitectura del Proyecto

El sistema se divide en los siguientes módulos:

- **Root Config (Orquestador)**: Encargado de la carga de MFEs, manejo de rutas globales y el layout principal.

- **MFE Angular (Breeds)**: Gestión y visualización de razas de gatos, filtros y tablas interactivas.

- **MFE React (Auth & Details)**: Gestión de autenticación, registro y vista de detalle de perfil.

- **MFE Shared (Utility Module)**: Módulo compartido basado en **RxJS** para la comunicación reactiva (Estado de autenticación) entre microfrontends.

- **Backend (API)**: Desarrollado con **NestJS** bajo principios de **Clean Architecture** y **SOLID**.

## 🐳 Ejecución con Docker (Recomendado)

El proyecto está totalmente contenedorizado para garantizar que el entorno de ejecución sea idéntico en cualquier máquina.

```sh
docker-compose up --build
```

⚠️ **NOTA IMPORTANTE**: Al ser un entorno de base de datos (MongoDB) contenido en Docker que inicia limpio, **debe realizar primero el Registro de un usuario** en la aplicación antes de intentar el Login.

## 🚀 Requisitos de Desarrollo Manual

Si desea ejecutar los servicios sin Docker, asegúrese de cumplir con:

- **Node.js**: v18.13.0 o superior.

- **Angular CLI**: 14.2.0+.

- **MongoDB**: Instancia local activa (puerto 27017) o cambiar el .env del backend.

## 📦 Instalación y Arranque

Para instalar dependencias y correr localmente, ejecute en cada carpeta:

- **Root Config**: cd root-config && npm install && npm start (Puerto 9000)

- **Backend**: cd backend && npm install && npm run start (Puerto 3000)

- **MFE Shared**: cd mfe-shared && npm install && npm start (Puerto 8081)

- **MFE Angular**: cd mfe-angular && npm install && npm run start:spa (Puerto 4200)

- **MFE React**: cd mfe-react && npm install && npm start (Puerto 8080)
  
## 🔗 Puertos y Acceso

Una vez levantados los servicios, acceda a través del orquestador: 👉 **URL Principal**: http://localhost:9000

- **Backend API**: http://localhost:3000


## 🛠️ Tecnologías y Patrones Aplicados

- **Frontend**: Single-SPA, Angular 14, React 18, Tailwind CSS, RxJS (Programación Reactiva).

- **Backend**: NestJS, TypeScript, Mongoose, JWT para seguridad.

- **Patrones**: Clean Architecture, SOLID, Repository Pattern, Dependency Injection.

- **DevOps**: Docker, Docker Compose, Multi-stage builds.

## 📄 Notas de Entrega

- Se implementó un módulo Shared para evitar el acoplamiento fuerte entre los microfrontends de Angular y React, cumpliendo con una Arquitectura Orientada a Eventos.

- La aplicación es totalmente Responsiva y cuenta con protección de rutas mediante **Guards** en Angular y **HOCs** en React.