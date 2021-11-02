/** Composante Video de TimTools */
export default class Video {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.videoControls = this.element.dataset.videoControls;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;

    Video.instances.push(this);

    if (this.videoId) {
      Video.loadScript();
    } else {
      console.error(`Vous devez mettre un ID a votre composante video`);
    }
  }

  /**
   * Methode qui va chercher les ressources du API de youtube
   */
  static loadScript() {
    if (!Video.scriptIsLoading) {
      Video.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.initPLayer = this.initPLayer.bind(this);
    if (this.poster) {
      this.element.addEventListener('click', this.initPLayer);
    } else {
      this.initPLayer();
    }
  }

  /**
   * Méthode d'initialisation du player
   */
  initPLayer(event) {
    if (event) {
      this.element.removeEventListener('click', this.initPLayer);
    }

    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: { rel: 0, autoplay: this.autoplay, controls: this.videoControls },
      events: {
        onReady: () => {
          this.playerReady = true;

          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            //PAUSE TOUS LES VIDEOS SAUF CELLE QUI JOUE
            Video.pauseAll(this);
          } else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  /**
   * Methode qui regarde quand la video sort du notre vue
   * @param {HTMLElement} entries - La viedo à observer
   */
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  /**
   * initialise tous les instances de video
   */
  static initAll() {
    document.documentElement.classList.add('is-video-ready');

    for (let i = 0; i < Video.instances.length; i++) {
      const instance = Video.instances[i];
      instance.init();
    }
  }

  /**
   * PAUSE TOUS LES VIDEOS SAUF CELLE QUI JOUE
   */
  static pauseAll(currentInstance) {
    for (let i = 0; i < Video.instances.length; i++) {
      const instance = Video.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

Video.instances = [];
window.onYouTubeIframeAPIReady = Video.initAll;
