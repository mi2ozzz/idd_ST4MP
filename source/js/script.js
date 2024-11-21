// 初始化动画
const animation = lottie.loadAnimation({
  container: document.getElementById("animation_box"),
  renderer: "svg",
  loop: true, // 禁用循环播放
  autoplay: true, // 禁用自动播放
  path: "assets/data.json", // 确保此路径正确
});
