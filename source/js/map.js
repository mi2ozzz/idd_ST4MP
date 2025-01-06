document.addEventListener("DOMContentLoaded", () => {
  const csvPath = "../assets/mapdata.csv"; // CSV 文件路径
  const svg = d3.select("svg");

  // 创建缩放层
  const zoomLayer = svg.append("g");

  // 定义缩放行为
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 5]) // 设置缩放范围
    .on("zoom", (event) => {
      zoomLayer.attr("transform", event.transform); // 应用缩放到 zoomLayer
    });

  // 绑定缩放行为到 SVG
  svg.call(zoom);

  // 初始化缩放状态
  svg.call(zoom.transform, d3.zoomIdentity);

  document.querySelector(".toolbar").addEventListener("click", (event) => {
    const action = event.target.dataset.action;

    if (action === "reload") {
      // 重置 SVG 的缩放和平移
      location.reload();
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    } else if (action === "zoomIn") {
      // 放大
      svg.transition().duration(500).call(zoom.scaleBy, 1.2);
    } else if (action === "zoomOut") {
      // 缩小
      svg.transition().duration(500).call(zoom.scaleBy, 0.8);
    }
  });

  let currentMode = ""; // 默认模式为ノーマル

  d3.csv(csvPath).then((rows) => {
    console.log(rows); // 打印 CSV 数据
    const nodes = rows.map((row, index) => ({
      id: row.id || index,
      title: row.title || "No Title",
      subtitle: row.subtitle || "No subTitle",
      content: row.content,
      tags: row.tags,
      genre: row.genre,
      region: row.county,
      year: row.year,
      imagePath: row.imagePath || "https://via.placeholder.com/180x150",
    }));

    let links = [];

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(300)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force(
        "center",
        d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2)
      );

    const link = zoomLayer.append("g").selectAll("line");

    const itemShow = document.getElementById("item-show");

    function showItemDetails(item) {
      itemShow.innerHTML = `
<div class="item-show-content">
<div class="item-show-pic">
<img src="../${item.imagePath}" alt="${item.title}" />
</div>
<div class="item-show-data">
<div class="item-show-text">
<h2>${item.title}</h2>
<p>${item.subtitle}</p>
<p>${item.content}</p>
</div>
</div>
</div>
`;
      itemShow.style.display = "block";

      // 阻止点击 item-show 内部触发关闭事件
      itemShow.addEventListener("click", (event) => event.stopPropagation());

      // 添加全局点击事件监听器
      document.addEventListener("click", hideItemShowOnClickOutside);
    }

    function hideItemShowOnClickOutside(event) {
      if (!itemShow.contains(event.target)) {
        itemShow.style.display = "none";
        document.removeEventListener("click", hideItemShowOnClickOutside);
      }
    }

    function getDynamicText(d) {
      if (currentMode === "genre") {
        return d.genre || "N/A";
      } else if (currentMode === "region") {
        return d.region || "N/A";
      } else if (currentMode === "year") {
        return d.year || "N/A";
      } else if (currentMode === "") {
        return ""; // Normal 模式隐藏内容
      }
      return d.region || "N/A"; // 默认显示 region
    }

    const node = zoomLayer
      .selectAll("foreignObject")
      .data(nodes)
      .enter()
      .append("foreignObject")
      .attr("width", 200)
      .attr("height", 270)
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      )
      .html((d) =>
        d.isCenter
          ? `<div class="node-container center">${d.id.replace(
              "-center",
              ""
            )}</div>`
          : `
<div class="node-container" title="${d.title}">
<img class="item-pic" src="../${d.imagePath}
            " onerror="this.src='https://via.placeholder.com/180x150';">
<h2>${d.title}</h2>
<p class="item-subcontent" font-size:10px>
${getDynamicText(d)}
</p>
</div>`
      )
      .on("click", (event, d) => {
        showItemDetails(d);
        event.stopPropagation(); // 阻止事件冒泡，避免触发全局关闭逻辑
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("x", (d) => d.x - 90).attr("y", (d) => d.y - 125);
    });

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function groupAndLink(nodes, groupByFn) {
      const groups = d3.group(nodes, groupByFn);
      const links = [];
      groups.forEach((group) => {
        for (let i = 1; i < group.length; i++) {
          links.push({ source: group[i - 1].id, target: group[i].id });
        }
      });
      return links;
    }

    function updateLinksByMode(mode) {
      links = [];
      if (mode === "genre") {
        const centerNodes = new Map();

        nodes.forEach((node) => {
          if (!centerNodes.has(node.genre)) {
            const centerNode = {
              id: `${node.genre}-center`,
              isCenter: true,
            };
            nodes.push(centerNode);
            centerNodes.set(node.genre, centerNode);
          }
          links.push({
            source: centerNodes.get(node.genre).id,
            target: node.id,
          });
        });
      } else if (mode === "region") {
        links = groupAndLink(nodes, (d) => d.region);
      } else if (mode === "year") {
        const yearSorted = nodes
          .filter((d) => d.year)
          .sort((a, b) => a.year - b.year);
        for (let i = 1; i < yearSorted.length; i++) {
          links.push({
            source: yearSorted[i - 1].id,
            target: yearSorted[i].id,
          });
        }
      }

      link.data(links).join(
        (enter) =>
          enter.append("line").attr("stroke", "#999").attr("stroke-width", 2),
        (update) => update,
        (exit) => exit.remove()
      );

      simulation.nodes(nodes);
      simulation.force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => (d.source.isCenter ? 300 : 300))
      );

      simulation.alpha(1).restart();
    }

    document.getElementById("viewMode").addEventListener("change", (event) => {
      currentMode = event.target.value; // 更新当前模式
      updateLinksByMode(currentMode); // 根据模式更新 links 数据

      node.html((d) =>
        d.isCenter
          ? `<div class="node-container center">${d.id.replace(
              "-center",
              ""
            )}</div>`
          : `
<div class="node-container" title="${d.title}">
<img class="item-pic" src="../${
              d.imagePath
            }" onerror="this.src='https://via.placeholder.com/180x150';">
<h2>${d.title}</h2>
<p>${getDynamicText(d)}</p>
</div>`
      );
    });
  });
});
