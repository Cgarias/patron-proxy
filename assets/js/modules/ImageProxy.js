// assets/js/modules/ImageProxy.js
import { IImage } from './IImage.js';
// Importamos RealImage para tener acceso a la clase, pero la inyectaremos en el constructor.
import { RealImage } from './RealImage.js'; 

export class ImageProxy extends IImage { // Extiende la interfaz
    /**
     * @param {object} imageData - Datos de la imagen (url, title, author).
     * @param {HTMLElement} cardElement - El elemento DOM de la tarjeta.
     * @param {typeof RealImage} RealImageClass - La clase RealImage para la inyección de dependencia.
     */
    constructor(imageData, cardElement, RealImageClass = RealImage) { // Default a RealImage si no se inyecta
        super(); // Llama al constructor de IImage
        this.imageUrl = imageData.url;
        this.imageTitle = imageData.title;
        this.imageAuthor = imageData.author;
        this.realImage = null;
        this.isLoaded = false;
        this.cardElement = cardElement;
        this.RealImageClass = RealImageClass; // Inyección de dependencia

        this.renderInitialState();
    }

    renderInitialState() {
        this.cardElement.innerHTML = `
            <h3>${this.imageTitle}</h3>
            <div class="image-placeholder">
                <span>Esperando...</span>
            </div>
            <div class="loading-indicator">Esperando visibilidad...</div>
        `;
        this.placeholderDiv = this.cardElement.querySelector('.image-placeholder');
        this.loadingIndicatorDiv = this.cardElement.querySelector('.loading-indicator');
    }

    /**
     * @override
     * Implementación concreta del método display de IImage.
     */
    async display() {
        if (!this.isLoaded) {
            this.loadingIndicatorDiv.textContent = 'Descargando imagen real...';
            this.placeholderDiv.innerHTML = '<span>⏳ Descargando...</span>';
            this.placeholderDiv.classList.add('is-loading'); // Añadir clase para estilo de carga

            if (this.realImage === null) {
                // Usa la clase RealImage inyectada para crear la instancia.
                this.realImage = new this.RealImageClass(this.imageUrl, this.imageTitle);
            }

            try {
                // Delega la visualización al RealImage, pasando el placeholder como targetElement.
                await this.realImage.display(this.placeholderDiv);
                this.isLoaded = true;
                this.loadingIndicatorDiv.textContent = `Por ${this.imageAuthor}`;
                this.placeholderDiv.classList.remove('is-loading');
            } catch (error) {
                this.loadingIndicatorDiv.textContent = `Error: ${error.message}`;
                this.placeholderDiv.innerHTML = `<span style="color:red;">❌ Fallo al cargar</span>`;
                this.placeholderDiv.classList.remove('is-loading');
            }
        } else {
            console.log(`[ImageProxy] -> Imagen "${this.imageTitle}" ya ha sido cargada y está visible.`);
        }
    }
}