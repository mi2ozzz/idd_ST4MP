document.addEventListener("DOMContentLoaded", () => {
  // CSVファイルを読み込む
  const itemWidth = fetch("source/assets/data.csv")
    .then((response) => response.text())
    .then((data) => {
      // データ内容を分析する
      const rows = data.split("\n").map((row) => row.split(","));
      const idArray = [];

      // 最初の一行は説明なので飛ばす（1から始まる）
      for (let i = 1; i < rows.length; i++) {
        const [id, title, subtitle, content, referenceInfo, , tags] = rows[i];
        idArray.push({ id, title, subtitle, content, referenceInfo, tags });
      }
      // containerないどきconsoleで提示する
      const container = document.getElementById("container");
      if (!container) {
        console.error("Error: #container element not found");
        return;
      }
      // itemのdivを作る
      idArray.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("container-item");
        itemDiv.id = `containerItem-${item.id}`;
        // itemカード内容
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

        // itemにクリックするとポップが出てくるようにする
        itemDiv.addEventListener("click", (event) => {
          event.stopPropagation();
          const itemShow = document.getElementById("item-show");
          // itemShowの表示内容
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
          itemShow.style.display = "block"; // item-showを表示する
        });
      });
    })
    .catch((error) => console.error("Error reading the CSV file:", error));

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

      event.preventDefault();
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      // GSAP の smooth アニメションを使う
      gsap.to(container, {
        duration: 0.5,
        x: initialLeft + dx,
        y: initialTop + dy,
        ease: "power2.out", // smooth関数、削除しても？
      });
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // item-show div
  const itemShow = document.createElement("div");
  itemShow.id = "item-show";
  itemShow.style.display = "none"; // 最初は表示されないようにする
  document.body.appendChild(itemShow);

  //クッリクストitem-show閉じる
  document.addEventListener("click", () => {
    const itemShow = document.getElementById("item-show");
    itemShow.style.display = "none"; // 隐藏 item-show
  });
});
