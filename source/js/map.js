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
        const id = i;
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

        const itemHtml = `
                  <ul><li>${item.tags}</li></ul>
    <img src="../assets/img/map/a.png" height="70%" width="100%">
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
