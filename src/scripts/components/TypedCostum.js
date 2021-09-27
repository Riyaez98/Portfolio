/** Composante  de TimTools */
import Typed from './typed';
export default class TypedCostum {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.init();
  }
  /**
   * Méthode d'initialisation
   */
  init() {
    var typed = new Typed('.anim', {
      // Waits 1000ms after typing "First"
      strings: ['Yanez!^1000', 'Yáñez!'],
      typeSpeed: 60,
      backSpeed: 40,
      smartBackspace: true,
      loop: true,
    });
  }
}
