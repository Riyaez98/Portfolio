/** Composante Parallax de TimTools */
export default class Parallax {
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
    document.addEventListener('mousemove', parallax);
    function parallax(e) {
      this.querySelectorAll('.layer').forEach((layer) => {
        const speed = layer.getAttribute('data-speed');

        const x = (window.innerWidth - e.pageX * speed) / 150;
        const y = (window.innerHeight - e.pageY * speed) / 150;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  }
}
