import Carousel from './components/Carousel';
import Header from './components/Header';
import Modal from './components/Modal';
import Scrolly from './components/Scrolly';
import Form from './components/Form';
import Typed from './components/TypedCostum';
import Parallax from './components/Parallax';
import Snackbar from './components/Snackbar';
import Cursor from './components/Cursor';
import Video from './components/Video';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Carousel,
      Header,
      Modal,
      Scrolly,
      Form,
      Typed,
      Parallax,
      Snackbar,
      Cursor,
      Video,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
