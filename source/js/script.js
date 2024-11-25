document.addEventListener("DOMContentLoaded", () => {
  //lottie.js動画導入
  const animation = lottie.loadAnimation({
    container: document.getElementById("animation_box"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/data.json",
  });

  // 定义滚动效果的实现对象
  const sf = {
    container: document.querySelector(".container"),
    target: document.querySelector(".animation-box"),
    lottieAnimation: animation, // lottie.jsと連結する
    observer: null, // 範囲判定
    distance_scroll: 0, // スクロール距離
    distance_trigger: 0,
    distance_edge: 0, // 最大距離
    resize() {
      // もう一度距離を判断する
      this.distance_trigger = this.container.offsetTop; // トップからの距離
      this.distance_edge = this.container.offsetHeight - innerHeight; // スクロールできる距離
    },
    observe() {
      this.observer = new IntersectionObserver((eles) => {
        if (eles[0].isIntersecting) {
          this.reset();
          this.create_lister();
        } else this.remove_lister();
      });
      this.observer.observe(this.container);
    },
    create_lister() {
      if (!this.binded_scroll) this.binded_scroll = this.scroll.bind(this);
      window.addEventListener("scroll", this.binded_scroll);
    },
    remove_lister() {
      window.removeEventListener("scroll", this.binded_scroll);
    },
    reset() {
      // まだなら、0にする
      if (scrollY < this.distance_trigger) {
        this.distance_scroll = 0;
        this.lottieAnimation.goToAndStop(0, true); // 最初1秒
      } else {
        this.distance_scroll = this.distance_edge;
        this.lottieAnimation.goToAndStop(
          this.lottieAnimation.totalFrames,
          true
        ); // 最後1秒
      }
    },
    scroll() {
      // スクロール関数
      if (scrollY < this.distance_trigger) {
        this.target.style = null;
        return this.reset(); // 動画リセット
      }

      // スクロール距離を計算する
      this.distance_scroll = scrollY - this.distance_trigger;
      this.distance_scroll = Math.max(0, this.distance_scroll); // 0より小さいか判断する
      this.distance_scroll = Math.min(this.distance_edge, this.distance_scroll); // するロールできる距離を最大距離より小さいこと

      // 動画の長さ？
      const progress = this.distance_scroll / this.distance_edge;
      const frame = Math.floor(progress * this.lottieAnimation.totalFrames); //対応してる画面
      this.lottieAnimation.goToAndStop(frame, true); // 画面を表示

      // 位置を設置する
      if (this.distance_scroll == this.distance_edge) {
        this.target.style.position = "absolute";
        this.target.style.transform = `translateY(${this.distance_scroll}px)`;
      } else {
        this.target.style.position = "fixed";
        this.target.style.transform = "translateY(0px)";
      }
    },
    remove() {
      this.observer.unobserve(this.container);
      this.observer = null;
      this.container = null;
      this.target = null;
    },
  };

  sf.resize();
  sf.observe();
  window.addEventListener("resize", sf.resize.bind(sf)); // 画面サイズ変わったり計算をもう一度

  // Lenisライブラリを使ってスクロールを滑らかにする
  const lenis = new Lenis({
    autoRaf: true,
  });
});
