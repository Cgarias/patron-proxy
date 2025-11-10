// assets/js/modules/RealImage.js
import { IImage } from './IImage.js';

export class RealImage extends IImage { // Extiende la interfaz
    constructor(url, title) {
        super(); // Llama al constructor de IImage (para la validación del método)
        this.url = url;
        this.title = title;
        console.log(`[RealImage] -> Instancia REAL de ${this.title} creada para URL: ${this.url}`);
    }

    /**
     * @override
     * Implementación concreta del método display de IImage.
     */
    display(targetElement) {
        return new Promise((resolve, reject) => {
            console.log(`[RealImage] -> Iniciando descarga y mostrando imagen REAL: ${this.title}`);
            const img = new Image();
            img.src = this.url;
            img.alt = this.title;
            img.style.maxWidth = '100%';
            img.style.height = '200px';
            img.style.objectFit = 'cover';

            img.onload = () => {
                targetElement.innerHTML = '';
                targetElement.appendChild(img);
                targetElement.nextElementSibling.textContent = 'Imagen real cargada.';
                console.log(`[RealImage] -> Imagen real de ${this.title} cargada y mostrada.`);
                resolve();
            };
            img.onerror = () => {
                targetElement.innerHTML = `<p style="color:red;">Error al cargar.</p>`;
                targetElement.nextElementSibling.textContent = 'Error de carga.';
                console.error(`[RealImage] -> Error al cargar imagen real de ${this.title}: ${this.url}`);
                reject(new Error(`Failed to load image: ${this.url}`));
            };
        });
    }
}