class HomeSlider extends Widget {
  constructor(node) {
    super(node, '.js-home-slider');

    this.slider = this.queryElement('.content');
    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');
    this.pagination = this.queryElement('.pagination');

    this.swiper = null;

    this.initDesktop = false;
    this.initMobile = false;
    this.check = false;

    this.init();
  }

  build() {
    this.events();
  }

  events() {
    this.updateCache();
    onResize(this.updateCache.bind(this));
  }

  updateCache() {
    Layout.isMobileLayout() ? this.mobileEvents() : this.desktopEvents();
  }

  desktopEvents() {
    this.initMobile ? this.initMobile = false : null;

    if (!this.initDesktop) {
      if (this.swiper) this.destroySwiper();
      this.initSwiper(this.desktopOptions);
      setTimeout(() => this.swiper.update(), 100);
    }

    this.initDesktop = true;
  }

  mobileEvents() {
    this.initDesktop ? this.initDesktop = false : null;

    if (!this.initMobile) {
      if (this.swiper) this.destroySwiper();
      this.initSwiper(this.mobileOptions);
      setTimeout(() => this.swiper.update(), 100);
    }

    this.initMobile = true;
  }

  initSwiper(options) {
    this.swiper = new Swiper(this.slider, options);
  }

  destroySwiper() {
    this.swiper.destroy(true, true);
    this.check = false;
  }

  get desktopOptions() {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
        disabledClass: 'disabled'
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      breakpoints: {
        1200: {
          spaceBetween: 40,
        },
      },
      loop: true,
      autoplay: {
        delay: 7000
      }
    }
  }

  get mobileOptions() {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: this.pagination,
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
        // bulletClass: 'bullet',
        // bulletActiveClass: 'bullet-active',
        // modifierClass: 'bullet-',
      },
      effect: 'fade',
      fadeEffect: {crossFade: true},
      loop: true,
      autoplay: {
        delay: 7000
      }
    }
  }

  static init(el) {
    new HomeSlider(el);
  }
}

window.HomeSlider = HomeSlider;