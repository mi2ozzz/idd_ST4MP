document.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/lib.csv")
    .then((response) => response.text())
    .then((data) => {
      // 将CSV数据解析为数组
      const rows = data.split("\n").map((row) => row.split(","));
      let idArray = [];

      // 跳过第一行标题行，从第二行开始
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const id = row[0];
        const title = row[1];
        const subtitle = row[2];
        const content = row[3];
        const tags = row[6];
        idArray.push({ id, title, subtitle, content, tags });
      }

      // 确保选择到 `.container` 容器
      const container = document.querySelector(".container");
      if (!container) {
        console.error("Error: .container element not found");
        return;
      }

      // 为每行数据生成一个新的 `container-item` 元素
      idArray.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("container-item");
        itemDiv.id = `containerItem-${item.id}`;

        const itemHtml = `
          <ul class="item-tags"><li>#${item.tags}</li></ul>
          <img class="item-pic" src="../assets/img/map/${item.id}.png" onerror=this.src="../assets/img/map/a.png" height="70%" width="100%">
          <div class="item-text">
          <h2>${item.title}</h2>
           <p>${item.subtitle}</p></div>
         `;
        itemDiv.innerHTML = itemHtml;
        container.appendChild(itemDiv);
      });
    })
    .catch((error) => console.error("Error reading the CSV file:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  // 初始化变量
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  // 开始拖动
  container.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;

    // 获取初始位置
    const rect = container.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    // 防止选中文本
    event.preventDefault();
  });

  // 拖动中
  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      // 设置新的位置
      container.style.position = "absolute";
      container.style.left = `${initialLeft + dx}px`;
      container.style.top = `${initialTop + dy}px`;
    }
  });

  // 停止拖动
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
    }
  });
});
