# 📌 Proyecto MFE-breeds

Este proyecto es un sistema de **micro frontends (*MFE*)** que integra aplicaciones en **Angular** y **React** utilizando **Single SPA** como orquestador, junto con un backend desarrollado en **Nest.js** y persistencia en **MongoDB**.

## 🚀 Requisitos

### 🔹 Node.js
- **Versión mínima:** 18.13.0
- **Versión recomendada:** 18.17.0 o superior

Para verificar tu versión de Node.js, ejecuta:
```sh
node -v
```
Si necesitas actualizar Node.js, descárgalo desde [nodejs.org](https://nodejs.org/) o usa **nvm** (Node Version Manager).

### 🔹 Angular

- **Versión mínima:** 14.2.0

### 🔹 React.js

- **Versión mínima:** 18.2.0

## 📦 Instalación

Para instalar las dependencias de cada aplicación, usa sus propios comandos:

- Instalar Root Config: cd root-config && npm install

- Instalar Backend: cd backend && npm install

- Instalar Angular: cd mfe-angular && npm install

- Instalar React: cd mfe-react && npm install
  
## 🐳 Ejecución con Docker (Recomendado)

El proyecto está totalmente contenedorizado. Para levantar todo el ecosistema (Base de datos + API + Frontends):

docker-compose up --build

## 🏃‍♂️ Levantar los servidores

🔹 Levantar cada servicio por separado

- Iniciar servidor raíz: cd root-config && npm run start

- Iniciar Backend: cd backend && npm run start

- Iniciar Angular: cd mfe-angular && npm run start:spa

- Iniciar React: cd mfe-react && npm run start

- Iniciar Shared: cd mfe-shared && npm run start

## 🔗 Puertos por cada MFE

- Backend: http://localhost:3000

- Root: http://localhost:9000 <= Puerto de despliegue de la app

- Angular: http://localhost:4200

- React: http://localhost:8080

- Shared: http://localhost:8081

## 📄 Notas adicionales

- Este proyecto usa Single SPA para la integración de micro frontends.

- Asegúrate de que todos los servicios estén corriendo correctamente antes de probar la aplicación en el navegador.

- Si todo sale bien ve a esta url: http://localhost:9000

📌 Datos de prueba para iniciar sesión:

- Email: email@example.com

- Password: password123