import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

// 1. Definir rutas y aplicaciones
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// 2. Gestión de UI (Loading y Status)
const navbarLoading = document.getElementById("navbar-loading");

function showLoading() {
  if (navbarLoading) navbarLoading.style.display = "flex";
}

function hideLoading() {
  if (navbarLoading) navbarLoading.style.display = "none";
}

function updateAuthStatus() {
  const statusEl = document.getElementById("navbar-status");
  const logoutBtn = document.getElementById("navbar-logout");

  if (!statusEl) return;

  const token = localStorage.getItem("auth_token");

  if (token) {
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    statusEl.textContent = `👤 ${userData.name || "User"}`;
    statusEl.className = "navbar-status authenticated";
    if (logoutBtn) {
      logoutBtn.style.display = "block";
    }
  } else {
    statusEl.textContent = "Not logged in";
    statusEl.className = "navbar-status unauthenticated";
    if (logoutBtn) {
      logoutBtn.style.display = "none";
    }
  }
}

function handleLogout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  updateAuthStatus();
  // Navigate to home or login page
  window.location.href = "/auth";
}

// 3. Registro de aplicaciones
applications.forEach((appConfig) => {
  registerApplication(appConfig);
});

// 4. Activar el motor
layoutEngine.activate();
start({ urlRerouteOnly: true });

// 5. Manejo de eventos globales para el Loading y Auth
window.addEventListener("single-spa:before-routing-event", () => {
  showLoading();
  updateAuthStatus(); // Actualiza el estado en cada cambio de ruta
});

window.addEventListener("single-spa:routing-event", () => {
  setTimeout(hideLoading, 300);
});

// 6. Sincronización en tiempo real de autenticación entre MFEs
window.addEventListener("storage", (e) => {
  if (e.key === "auth_token" || e.key === "user_data") {
    updateAuthStatus();
  }
});

// 7. Escuchar eventos directos de autenticación para actualización instantánea
window.addEventListener("auth-state-changed", (e) => {
  updateAuthStatus();
});

// 8. Verificación periódica del estado (fallback)
setInterval(() => {
  const currentToken = localStorage.getItem("auth_token");
  const statusEl = document.getElementById("navbar-status");

  if (statusEl) {
    const isCurrentlyShowingAuth = statusEl.textContent.includes("👤");
    const shouldBeAuthenticated = !!currentToken;

    // Si hay desincronización, actualizar
    if (isCurrentlyShowingAuth !== shouldBeAuthenticated) {
      updateAuthStatus();
    }
  }

  // Verificar si el botón de logout tiene event listener
  const logoutBtn = document.getElementById("navbar-logout");
  if (logoutBtn && !logoutBtn.hasAttribute("data-listener-added")) {
    logoutBtn.addEventListener("click", handleLogout);
    logoutBtn.setAttribute("data-listener-added", "true");
  }
}, 1000); // Verificar cada segundo

// 9. Agregar event listener para logout (después de que el DOM esté listo)
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("navbar-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  } else {
    setTimeout(() => {
      const retryBtn = document.getElementById("navbar-logout");
      if (retryBtn) {
        retryBtn.addEventListener("click", handleLogout);
      } else {
      }
    }, 100);
  }
});

// Ejecución inicial del estado de usuario
updateAuthStatus();
