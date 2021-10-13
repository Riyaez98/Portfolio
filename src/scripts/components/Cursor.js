/** Composante Cursor de TimTools */
export default class Cursor {
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
    console.log('Nouvelle instance de la composante -> Cursor');
    document.addEventListener('mousemove', (e) => {
      this.element.setAttribute(
        'style',
        'top: ' + (e.pageY - 15) + 'px; left: ' + (e.pageX - 15) + 'px;'
      );
    });

    document.addEventListener('click', () => {
      this.element.classList.add('expand');
      setTimeout(() => {
        this.element.classList.remove('expand');
      }, 500);
    });
  }
}
