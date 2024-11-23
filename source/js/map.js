// 引入GSAP库
// 注意：确保在这之前已经引入了GSAP库

document.addEventListener("DOMContentLoaded", () => {
  // Fetch CSV data and create container items
  fetch("../assets/lib.csv")
    .then((response) => response.text())
    .then((data) => {
      // Parse CSV data into an array of objects
      const rows = data.split("\n").map((row) => row.split(","));
      const idArray = [];

      // Skip header row (assuming headers are present)
      for (let i = 1; i < rows.length; i++) {
        const [id, title, subtitle, content, referenceInfo, , tags] = rows[i];
        idArray.push({ id, title, subtitle, content, referenceInfo, tags });
      }

      // Select the container element
      const container = document.getElementById("container");
      if (!container) {
        console.error("Error: #container element not found");
        return;
      }

      // Create HTML for each item and append to container
      idArray.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("container-item");
        itemDiv.id = `containerItem-${item.id}`;

        const itemHtml = `
          <ul class="item-tags"><li>#${item.tags}</li></ul>
          <img class="item-pic" src="../assets/img/map/${item.id}.png" onerror="this.src='../assets/img/map/a.png'" height="60%" width="100%">
          <div class="item-text">
            <h2>${item.title}</h2>
            <p>${item.subtitle}</p>
          </div>
        `;
        itemDiv.innerHTML = itemHtml;
        container.appendChild(itemDiv);

        // 给每个项目添加点击事件，点击时展示相应的 item-show 内容
        itemDiv.addEventListener("click", (event) => {
          event.stopPropagation(); // 防止点击项目时关闭 item-show
          const itemShow = document.getElementById("item-show");
          itemShow.innerHTML = `
            <div class="item-show-content">
              <div class="item-show-pic"><img  src="../assets/img/map/${item.id}.png" onerror="this.src='../assets/img/map/a.png'" ></div>


              <div class="item-show-data">
              <div class="item-show-text">
                <ul><li class="item-show-tags">#${item.tags}</li></ul>
                <h2>${item.title}</h2>
                <p><strong> ${item.subtitle}</strong></p>
                <p> ${item.content}</p>
                </div>
              
                <div class=item-show-info>
                            <p><strong>ID:</strong> ${item.id}</p>
                <p>${item.referenceInfo}</p>
                </div>
              </div>

            </div>
          `;
          itemShow.style.display = "block"; // 显示 item-show
        });
      });
    })
    .catch((error) => console.error("Error reading the CSV file:", error));

  // Dragging functionality for the container element using GSAP for smooth animation
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  document.addEventListener("mousedown", (event) => {
    const container = document.getElementById("container");
    if (event.target.id === "container") {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;

      const rect = container.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      // Prevent text selection during drag
      event.preventDefault();
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      // Use GSAP for smooth animation
      gsap.to(container, {
        duration: 0.5,
        x: initialLeft + dx,
        y: initialTop + dy,
        ease: "power2.out", // 缓动函数，可以根据需要调整
      });
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // 创建并添加 item-show div，初始隐藏
  const itemShow = document.createElement("div");
  itemShow.id = "item-show";
  itemShow.style.display = "none"; // 初始隐藏
  document.body.appendChild(itemShow);

  // 添加点击事件监听器，当点击其他地方时关闭 item-show
  document.addEventListener("click", () => {
    const itemShow = document.getElementById("item-show");
    itemShow.style.display = "none"; // 隐藏 item-show
  });
});
