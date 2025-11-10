# 🧩 Patrón de Diseño **Proxy (Proxy Virtual)** — Ejemplo Práctico en una Página Web

## 📖 Descripción del ejercicio

Este proyecto implementa el **Patrón de Diseño Proxy (Virtual Proxy)** en una aplicación web real, utilizando **JavaScript modular (ES6)** y la **API pública de Unsplash**.  
El objetivo es mostrar cómo un Proxy puede **controlar el acceso a recursos pesados**, en este caso **imágenes**, optimizando el rendimiento del sitio web.

---

## 💡 Contexto del problema

En la **versión inicial** del proyecto (archivo `app-problema.js`), la aplicación carga directamente todas las imágenes obtenidas desde la API de Unsplash.  
Esto genera los siguientes inconvenientes:

- ❌ **Carga inicial lenta:** El navegador intenta descargar todas las imágenes al mismo tiempo, afectando la experiencia del usuario.  
- ❌ **Uso innecesario de ancho de banda:** Se descargan imágenes que el usuario podría no llegar a ver (por ejemplo, al final de la página).  
- ❌ **Bloqueo de la interfaz:** La página tarda más en volverse interactiva mientras se procesan todas las solicitudes.  
- ❌ **Difícil mantenimiento:** No hay un control centralizado sobre cuándo o cómo se cargan los recursos.

En resumen, la versión sin Proxy demuestra **el problema de rendimiento causado por la carga directa de recursos pesados**.

---

## ✅ Solución implementada: Patrón Proxy Virtual

La **versión mejorada** (archivo `app-solucion.js`) aplica el **Patrón de Diseño Proxy** para resolver estos problemas.

En este caso:
- El objeto **`RealImage`** representa la **imagen real**, que implica una descarga costosa.  
- El **`ImageProxy`** actúa como intermediario y **retrasa la creación de la imagen real** hasta que realmente se necesita (cuando es visible en la pantalla).  
- Se utiliza el **`IntersectionObserver`** del navegador para detectar cuándo una tarjeta con imagen entra en la vista del usuario y recién ahí solicitar al Proxy que cargue la imagen real.  

### 🔁 Flujo general

1. El cliente (nuestra app) obtiene los datos de las imágenes mediante el **`ImageService`**.  
2. Por cada imagen, crea un **`ImageProxy`** (no un `RealImage` aún).  
3. El Proxy muestra un **estado inicial o “espera”** (placeholder).  
4. Cuando el usuario hace *scroll* y la tarjeta entra en pantalla, el **Proxy crea una instancia de `RealImage`** y descarga la imagen real.  
5. Una vez cargada, el Proxy actualiza el contenido visual en el DOM.  

---

## ⚙️ Estructura de archivos principales

```
/assets/js/
│
├── app-problema.js        → Versión sin Proxy (problema)
├── app-solucion.js        → Versión con Proxy (solución)
│
├── modules/
│   ├── IImage.js          → Interfaz base para las imágenes
│   ├── RealImage.js       → Objeto real que descarga la imagen
│   └── ImageProxy.js      → Proxy Virtual que controla el acceso a RealImage
│
└── services/
    └── ImageService.js    → Servicio que obtiene imágenes de la API Unsplash
```

---

## 🚀 Beneficios del Proxy Virtual

| Problema original | Solución con Proxy |
|-------------------|--------------------|
| Carga inicial lenta | Carga diferida (lazy loading) |
| Alto consumo de recursos | Optimización del rendimiento |
| Sin control sobre la creación | El Proxy decide cuándo instanciar `RealImage` |
| Código acoplado | Código modular y mantenible |

---

## 🧠 Conclusión

Este ejercicio demuestra cómo el **Patrón Proxy Virtual** permite:
- Mejorar la **eficiencia y escalabilidad** de una aplicación web.  
- Separar responsabilidades entre los componentes (principio **Single Responsibility**).  
- Implementar **lazy loading** de forma elegante usando JavaScript moderno.  

Es un ejemplo práctico de cómo los **patrones de diseño clásicos** pueden aplicarse a **problemas reales del desarrollo web**.