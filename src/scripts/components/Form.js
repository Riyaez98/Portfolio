/** Composante  de TimTools */
export default class Form {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  /**
   * Vérifie si l'information est correcte et affiche le message de confirmation ou une allerte disant 'Information manquante ou erronée'
   * @param {type} name - description
   */
  onSubmit(event) {
    // event.preventDefault();

    if (this.validate()) {
      console.log('succes');
      // this.showConfirmation();
    } else {
      alert('Information manquante ou erronée');
    }
  }

  /**
   * Vérifie l'information du formuliare. Si elle est correcte return true sinon, return false
   * @return {boolean} status de la validation
   */
  validate() {
    let isValid = true;

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }
    return isValid;
  }
  /**
   * Valide l'information d'un input
   * @param {HTMLElement} input a verifier
   */
  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  /**
   * Lorse d'un erreur, ajoute le css pour informer l'utilisateur
   * @param {HTMLElement} input -
   */
  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');

    container.classList.add('error');
  }

  /**
   * Lorse qu'il n'y a pu d'erreur, enleve le css pour informer l'utilisateur
   * @param {HTMLElement} input -
   */
  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');

    container.classList.remove('error');
  }

  /**
   * Ajoute le css necessaire pour afficher le message d'envoie
   */
  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
