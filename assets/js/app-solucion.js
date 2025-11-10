// assets/js/app-solucion.js
import { ImageService } from './services/ImageService.js';
import { ImageProxy } from './modules/ImageProxy.js';
import { RealImage } from './modules/RealImage.js'; // Necesario para inyectarlo

const imageGallery = document.getElementById('imageGallery');
const NUM_IMAGES = 12;

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Inicio de la aplicación con Proxy Virtual.");
    let imagesData = [];
    try {
        imagesData = await ImageService.getImages(NUM_IMAGES);
    } catch (error) {
        imageGallery.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.error("Error fatal en la aplicación de la solución:", error);
        return;
    }

    if (imagesData.length === 0) {
        imageGallery.innerHTML = '<p>No se pudieron cargar imágenes.</p>';
        return;
    }

    const proxies = [];

    imagesData.forEach(imageData => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'image-card';
        imageGallery.appendChild(cardDiv);

        // El cliente interactúa con el Proxy, inyectando la clase RealImage.
        const proxy = new ImageProxy(imageData, cardDiv, RealImage);
        proxies.push(proxy);
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cardElement = entry.target;
                const proxyIndex = Array.from(imageGallery.children).indexOf(cardElement);
                if (proxyIndex !== -1 && proxies[proxyIndex]) {
                    console.log(`[Cliente] -> Elemento visible. Solicitando al Proxy de "${proxies[proxyIndex].imageTitle}" que muestre la imagen.`);
                    proxies[proxyIndex].display();
                    self.unobserve(cardElement);
                }
            }
        });
    }, observerOptions);

    Array.from(imageGallery.children).forEach(card => {
        observer.observe(card);
    });
    console.log("Proxy Virtual configurado. Las imágenes se cargarán al hacer scroll.");
});