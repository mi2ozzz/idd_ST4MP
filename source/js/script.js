// 初始化动画
const animation = lottie.loadAnimation({
  container: document.getElementById("animation_box"),
  renderer: "svg",
  loop: false, // 禁用循环播放
  autoplay: false, // 禁用自动播放
  path: "assets/data.json", // 确保此路径正确
});

// 定义滚动效果的实现对象
const sf = {
  container: document.querySelector(".container"), // 获取容器元素
  target: document.querySelector(".animation-box"), // 获取滚动的目标元素
  lottieAnimation: animation, // 绑定 Lottie 动画实例
  observer: null, // 用于观察容器是否进入视口
  distance_scroll: 0, // 当前滚动的距离
  distance_trigger: 0, // 触发滚动的距离
  distance_edge: 0, // 可滚动的最大距离
  resize() {
    // 重新计算触发距离和滚动边界
    this.distance_trigger = this.container.offsetTop; // 获取容器距离页面顶部的距离
    this.distance_edge = this.container.offsetHeight - innerHeight; // 获取容器的可滚动区域高度
  },
  observe() {
    // 创建IntersectionObserver，观察容器是否进入视口
    this.observer = new IntersectionObserver((eles) => {
      if (eles[0].isIntersecting) {
        this.reset(); // 如果容器进入视口，重置状态
        this.create_lister(); // 创建滚动监听器
      } else this.remove_lister(); // 如果容器离开视口，移除滚动监听器
    });
    this.observer.observe(this.container); // 开始观察容器
  },
  create_lister() {
    // 创建滚动事件监听器
    if (!this.binded_scroll) this.binded_scroll = this.scroll.bind(this); // 绑定滚动事件
    window.addEventListener("scroll", this.binded_scroll); // 添加滚动事件监听
  },
  remove_lister() {
    // 移除滚动事件监听器
    window.removeEventListener("scroll", this.binded_scroll); // 移除滚动事件监听
  },
  reset() {
    // 如果滚动未到触发点，设置动画进度为0
    if (scrollY < this.distance_trigger) {
      this.distance_scroll = 0;
      this.lottieAnimation.goToAndStop(0, true); // 设置动画为第0帧
    } else {
      this.distance_scroll = this.distance_edge;
      this.lottieAnimation.goToAndStop(this.lottieAnimation.totalFrames, true); // 设置动画为最后一帧
    }
  },
  scroll() {
    // 滚动事件的回调函数
    if (scrollY < this.distance_trigger) {
      this.target.style = null; // 如果滚动没有到触发位置，恢复目标元素样式
      return this.reset(); // 重置动画进度
    }

    // 计算滚动距离
    this.distance_scroll = scrollY - this.distance_trigger;
    this.distance_scroll = Math.max(0, this.distance_scroll); // 确保滚动距离不小于0
    this.distance_scroll = Math.min(this.distance_edge, this.distance_scroll); // 确保滚动距离不大于最大滚动距离

    // 计算动画播放进度
    const progress = this.distance_scroll / this.distance_edge; // 滚动进度
    const frame = Math.floor(progress * this.lottieAnimation.totalFrames); // 动画对应帧数
    this.lottieAnimation.goToAndStop(frame, true); // 播放到对应帧

    // 设置目标元素的位置
    if (this.distance_scroll == this.distance_edge) {
      this.target.style.position = "absolute";
      this.target.style.transform = `translateY(${this.distance_scroll}px)`;
    } else {
      this.target.style.position = "fixed";
      this.target.style.transform = "translateY(0px)";
    }
  },
  remove() {
    // 清除观察器和绑定的事件
    this.observer.unobserve(this.container); // 取消观察容器
    this.observer = null; // 清空观察器
    this.container = null; // 清空容器
    this.target = null; // 清空目标元素
  },
};

// 初始化滚动效果
sf.resize(); // 初始化时计算滚动触发距离和边界
sf.observe(); // 开始观察容器
window.addEventListener("resize", sf.resize.bind(sf)); // 窗口大小变化时，重新计算

// 引入Lenis库来实现平滑滚动
const lenis = new Lenis({
  autoRaf: true, // 开启自动刷新动画帧
});
