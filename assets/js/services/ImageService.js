// assets/js/services/ImageService.js

// ¡IMPORTANTE! Reemplaza con tu clave de acceso de Unsplash
const UNSPLASH_ACCESS_KEY = 'KbPez-UcYN8WKvulAtNvZ5l9cPfffF7Gia3HxArTjjs';
const UNSPLASH_API_BASE_URL = 'https://api.unsplash.com/photos/random';

/**
 * Servicio para interactuar con la API de Unsplash.
 * Centraliza la lógica de obtención de imágenes.
 */
export class ImageService {
    /**
     * Obtiene un número específico de imágenes aleatorias de Unsplash.
     * @param {number} count - El número de imágenes a obtener.
     * @returns {Promise<Array<{url: string, title: string, author: string}>>} Una promesa que resuelve con los datos de las imágenes.
     * @throws {Error} Si la llamada a la API falla.
     */
    static async getImages(count) {
        try {
            const response = await fetch(`${UNSPLASH_API_BASE_URL}?count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data.map(img => ({
                url: img.urls.regular,
                title: img.alt_description || 'Imagen sin título',
                author: img.user.name || 'Desconocido'
            }));
        } catch (error) {
            console.error("Error en ImageService al obtener imágenes de Unsplash:", error);
            throw new Error(`Fallo al obtener imágenes: ${error.message}. Asegúrate de que tu UNSPLASH_ACCESS_KEY es correcta.`);
        }
    }
}