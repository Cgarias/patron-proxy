// assets/js/app-problema.js
// Importamos el servicio centralizado para obtener imágenes
import { ImageService } from './services/ImageService.js';

const imageGallery = document.getElementById('imageGallery');
const NUM_IMAGES = 12;

function createAndLoadImageCard(imageData) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'image-card';

    const title = document.createElement('h3');
    title.textContent = imageData.title;

    const imgElement = document.createElement('img');
    imgElement.src = imageData.url; // ¡Carga directa!
    imgElement.alt = imageData.title;
    imgElement.onload = () => {
        console.log(`[Carga Directa] Imagen ${imageData.title} cargada.`);
        const loadingTextElement = cardDiv.querySelector('.loading-text');
        if (loadingTextElement) loadingTextElement.remove();
    };
    imgElement.onerror = () => {
        console.error(`[Carga Directa] Error al cargar ${imageData.title}.`);
        const loadingTextElement = cardDiv.querySelector('.loading-text');
        if (loadingTextElement) loadingTextElement.textContent = 'Error al cargar imagen.';
    };

    const loadingText = document.createElement('p');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Cargando...';

    cardDiv.appendChild(title);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(loadingText);
    imageGallery.appendChild(cardDiv);
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Inicio de carga directa de imágenes.");
    try {
        // Ahora usamos ImageService para obtener las imágenes, como en la solución.
        const images = await ImageService.getImages(NUM_IMAGES);
        if (images.length > 0) {
            images.forEach(createAndLoadImageCard);
        }
        console.log("Fin de la solicitud de carga directa de imágenes. El navegador las está descargando ahora.");
    } catch (error) {
        imageGallery.innerHTML = `<p style="color:red;">Error al cargar las imágenes: ${error.message}</p>`;
        console.error("Error fatal en la aplicación del problema:", error);
    }
});