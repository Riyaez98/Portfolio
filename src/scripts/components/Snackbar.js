import Cache from '../utils/Cache';
/** Composante Snackbar de TimTools */
export default class Snackbar {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.scrollLimit = this.element.dataset.scrollLimit;
    this.delay = this.element.dataset.delay;
    this.snackbarId = this.element.dataset.id;
    this.hideSnackbar = this.element.dataset.autoHide;
    this.closeSnackbar = this.element.querySelector('.js-close');

    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    window.addEventListener('scroll', this.OnScroll.bind(this));

    if (!this.html.classList.contains('snackbar-is-hidden')) {
      this.html.classList.add('snackbar-is-hidden');
    }

    this.checkCache();
  }

  /**
   * Methode qui part un TimeOut pour afficher la snackbar apres this.delay
   */
  appendSnackbar() {
    setTimeout(this.showSnackbar.bind(this), this.delay);
    this.closeSnackbar.addEventListener('click', this.close.bind(this));
  }
  /**
   * Methode qui s'occuope d'afficher la snackbar
   */
  showSnackbar() {
    this.html.classList.remove('snackbar-is-hidden');
    this.element.classList.toggle('visible');
  }

  /**
   * Methode qui appele les fonctions setSnackbarState() lorse du scroll
   * @param {event} event le scroll
   */
  OnScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setSnackbarState();
  }

  /**
   * methode qui va cacher le snackbar
   */
  setSnackbarState() {
    const scrollHeight = document.scrollingElement.scrollHeight;
    if (this.hideSnackbar == 'true') {
      if (this.scrollPosition > scrollHeight * this.scrollLimit) {
        this.html.classList.add('snackbar-is-hidden');
      } else {
        this.html.classList.remove('snackbar-is-hidden');
      }
    } else {
      return;
    }
  }
  /**
   * Methode qui enleve la class snackbar-is-active du document le EventListener du button et appele la function pour enlever la snackbar de la page
   * @param {event} event - parametre contenant de l'information sur le événement qui *vient de se produire (click)
   */
  close(event) {
    this.html.classList.add('snackbar-is-hidden');
    this.closeSnackbar.removeEventListener('click', this.close);
    Cache.set('avoidSnackbar', this.snackbarId, true);

    setTimeout(this.destroy.bind(this), 1000);
  }
  /**
   * method qui enleve la snackbar de la page
   */
  destroy() {
    this.html.querySelector('.site-container').removeChild(this.element);
  }

  /*
   * Verifie la cache pour afficher ou pas la snackbar
   */
  checkCache() {
    const avoidSnackbar = Cache.get('avoidSnackbar');
    if (avoidSnackbar != this.snackbarId) {
      this.appendSnackbar();
    }
  }
}
