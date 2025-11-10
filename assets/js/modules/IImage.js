// assets/js/modules/IImage.js
/**
 * @interface IImage
 * Define la interfaz para los objetos que pueden ser mostrados.
 * Tanto RealImage como ImageProxy deben implementar este método.
 */
export class IImage {
    /**
     * Muestra la imagen en un elemento HTML dado.
     * @param {HTMLElement} targetElement - El elemento donde se debe mostrar la imagen.
     * @returns {Promise<void>} Una promesa que se resuelve cuando la imagen se ha mostrado.
     */
    display(targetElement) {
        throw new Error("El método 'display' debe ser implementado por las clases que implementan IImage.");
    }
}