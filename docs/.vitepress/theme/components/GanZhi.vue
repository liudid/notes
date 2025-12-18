<template>
  <div class="heaven-earth-system">
    <!-- 3D场景 -->
    <div ref="container" class="three-container"></div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="title">
        <h2>天干地支五行系统</h2>
        <p>天动地静 · 阴阳交泰</p>
      </div>

      <div class="controls">
        <div class="speed-control">
          <span>旋转速度:</span>
          <input
            type="range"
            min="0"
            max="100"
            v-model="rotationSpeed"
            @input="updateRotationSpeed"
          />
          <span>{{ rotationSpeedLabel }}</span>
        </div>

        <div class="buttons">
          <button
            @click="toggleRotation"
            :class="{ active: isRotating }"
            class="btn"
          >
            {{ isRotating ? "暂停" : "旋转" }}
          </button>
          <button @click="resetView" class="btn reset">重置视角</button>
          <button
            @click="toggleConnections"
            :class="{ active: showConnections }"
            class="btn"
          >
            {{ showConnections ? "隐藏连线" : "显示连线" }}
          </button>
        </div>
      </div>

      <!-- 当前信息 -->
      <div class="current-info">
        <div class="current-heaven">
          <h3>当前天盘</h3>
          <div class="heaven-content">
            <div
              v-for="item in currentHeavenSector"
              :key="item.id"
              class="sector-info"
              :style="{ color: item.color }"
            >
              <div class="sector-name">{{ item.name }}</div>
              <div class="gan-info">{{ item.gan.join("") }}</div>
            </div>
          </div>
        </div>

        <div class="current-connections">
          <h3>天地连接</h3>
          <div class="connections-list">
            <div
              v-for="conn in activeConnections"
              :key="conn.id"
              class="connection-item"
              :style="{ color: conn.color }"
            >
              <span class="gan">{{ conn.gan }}</span>
              <span class="conn-icon">↔</span>
              <span class="zhi">{{ conn.zhi }}</span>
              <span class="palace">({{ conn.palace }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 九宫格信息 -->
      <div class="earth-palaces">
        <h3>九宫地支</h3>
        <div class="palaces-grid">
          <div
            v-for="palace in palaces"
            :key="palace.id"
            class="palace-item"
            :class="{ active: isPalaceActive(palace) }"
            @mouseenter="highlightPalace(palace)"
            @mouseleave="resetPalaceHighlight"
          >
            <div class="palace-header">
              <span class="number">{{ palace.number }}</span>
              <span class="name">{{ palace.name }}</span>
            </div>
            <div class="palace-body">
              <div class="zhi-display">{{ palace.zhi }}</div>
              <div class="element" :style="{ color: palace.color }">
                {{ palace.element }}
              </div>
              <div class="direction">{{ palace.direction }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// 五行颜色
const elementColors = {
  木: "#4caf50",
  火: "#e53935",
  土: "#bca360",
  金: "#757575",
  水: "#1e88e5",
};

// 天盘数据（五行 + 天干）
const heavenData = [
  { id: 1, name: "木", color: elementColors.木, gan: ["甲", "乙"], angle: 0 },
  { id: 2, name: "火", color: elementColors.火, gan: ["丙", "丁"], angle: 72 },
  { id: 3, name: "土", color: elementColors.土, gan: ["戊", "己"], angle: 144 },
  { id: 4, name: "金", color: elementColors.金, gan: ["庚", "辛"], angle: 216 },
  { id: 5, name: "水", color: elementColors.水, gan: ["壬", "癸"], angle: 288 },
];

// 地盘数据（九宫格）
const palaces = [
  {
    id: 1,
    number: "一",
    name: "坎",
    zhi: "子",
    element: "水",
    color: elementColors.水,
    direction: "北",
    x: -2,
    z: 2,
  },
  {
    id: 2,
    number: "二",
    name: "坤",
    zhi: "未申",
    element: "土",
    color: elementColors.土,
    direction: "西南",
    x: 0,
    z: 2,
  },
  {
    id: 3,
    number: "三",
    name: "震",
    zhi: "卯",
    element: "木",
    color: elementColors.木,
    direction: "东",
    x: 2,
    z: 2,
  },
  {
    id: 4,
    number: "四",
    name: "巽",
    zhi: "辰巳",
    element: "木",
    color: elementColors.木,
    direction: "东南",
    x: -2,
    z: 0,
  },
  {
    id: 5,
    number: "五",
    name: "中",
    zhi: "辰戌丑未",
    element: "土",
    color: elementColors.土,
    direction: "中",
    x: 0,
    z: 0,
  },
  {
    id: 6,
    number: "六",
    name: "乾",
    zhi: "戌亥",
    element: "金",
    color: elementColors.金,
    direction: "西北",
    x: 2,
    z: 0,
  },
  {
    id: 7,
    number: "七",
    name: "艮",
    zhi: "丑寅",
    element: "土",
    color: elementColors.土,
    direction: "东北",
    x: -2,
    z: -2,
  },
  {
    id: 8,
    number: "八",
    name: "兑",
    zhi: "酉",
    element: "金",
    color: elementColors.金,
    direction: "西",
    x: 0,
    z: -2,
  },
  {
    id: 9,
    number: "九",
    name: "离",
    zhi: "午",
    element: "火",
    color: elementColors.火,
    direction: "南",
    x: 2,
    z: -2,
  },
];

// 天地连接关系
const connections = [
  { id: 1, gan: "甲", zhi: "子", palace: "坎", element: "木" },
  { id: 2, gan: "乙", zhi: "丑", palace: "艮", element: "木" },
  { id: 3, gan: "丙", zhi: "寅", palace: "艮", element: "火" },
  { id: 4, gan: "丁", zhi: "卯", palace: "震", element: "火" },
  { id: 5, gan: "戊", zhi: "辰", palace: "巽", element: "土" },
  { id: 6, gan: "己", zhi: "巳", palace: "巽", element: "土" },
  { id: 7, gan: "庚", zhi: "午", palace: "离", element: "金" },
  { id: 8, gan: "辛", zhi: "未", palace: "坤", element: "金" },
  { id: 9, gan: "壬", zhi: "申", palace: "坤", element: "水" },
  { id: 10, gan: "癸", zhi: "酉", palace: "兑", element: "水" },
];

// Three.js 变量
const container = ref(null);
let scene, camera, renderer, composer, controls;
let heavenDisk, earthGrid;
let connectionLines = [];
let currentHeavenRotation = 0;
let animationId = null;

// 状态管理
const isRotating = ref(true);
const rotationSpeed = ref(50);
const showConnections = ref(true);
const currentHeavenSector = ref([]);
const activeConnections = ref([]);
const highlightedPalace = ref(null);

// 计算属性
const rotationSpeedLabel = computed(() => {
  if (rotationSpeed.value < 20) return "极慢";
  if (rotationSpeed.value < 40) return "慢";
  if (rotationSpeed.value < 60) return "中";
  if (rotationSpeed.value < 80) return "快";
  return "极快";
});

// 初始化3D场景
const initScene = async () => {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a1a);
  scene.fog = new THREE.Fog(0x0a0a1a, 20, 100);

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(12, 8, 12);

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.value.appendChild(renderer.domElement);

  // 后期处理
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      container.value.clientWidth,
      container.value.clientHeight
    ),
    1.5,
    0.4,
    0.85
  );
  composer.addPass(bloomPass);

  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 5;
  controls.maxDistance = 50;

  // 添加光源
  addLights();

  // 创建天地模型
  createHeavenDisk();
  createEarthGrid();

  // 初始连接
  updateHeavenInfo();
  updateConnections();

  // 开始动画
  animate();
};

// 添加光源
const addLights = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // 主光源
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(10, 20, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  scene.add(mainLight);

  // 辅助光源
  const fillLight = new THREE.DirectionalLight(0x4466ff, 0.5);
  fillLight.position.set(-10, 10, -10);
  scene.add(fillLight);

  // 背光
  const backLight = new THREE.DirectionalLight(0xff4466, 0.3);
  backLight.position.set(0, -10, -10);
  scene.add(backLight);

  // 点光源 - 用于辉光效果
  const pointLight = new THREE.PointLight(0x4466ff, 1, 50);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);
};

// 创建天盘
const createHeavenDisk = () => {
  const group = new THREE.Group();
  group.position.y = 3;

  // 圆盘基座
  const diskGeometry = new THREE.CylinderGeometry(4.5, 4.5, 0.3, 64);
  const diskMaterial = new THREE.MeshPhongMaterial({
    color: 0x222233,
    shininess: 100,
    specular: 0x444466,
  });
  const disk = new THREE.Mesh(diskGeometry, diskMaterial);
  disk.castShadow = true;
  disk.receiveShadow = true;
  group.add(disk);

  // 圆盘装饰边
  const rimGeometry = new THREE.TorusGeometry(4.5, 0.1, 16, 100);
  const rimMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    emissive: 0x222233,
    emissiveIntensity: 0.5,
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.y = 0.15;
  group.add(rim);

  // 五行扇形
  heavenData.forEach((sector, index) => {
    const startAngle = (sector.angle * Math.PI) / 180;
    const endAngle = ((sector.angle + 72) * Math.PI) / 180;

    // 创建扇形
    const sectorShape = new THREE.Shape();
    sectorShape.moveTo(0, 0);
    sectorShape.lineTo(Math.cos(startAngle) * 4, Math.sin(startAngle) * 4);

    for (let angle = startAngle; angle <= endAngle; angle += 0.1) {
      sectorShape.lineTo(Math.cos(angle) * 4, Math.sin(angle) * 4);
    }

    sectorShape.lineTo(0, 0);

    const sectorGeometry = new THREE.ShapeGeometry(sectorShape);
    const sectorMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(sector.color),
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });

    const sectorMesh = new THREE.Mesh(sectorGeometry, sectorMaterial);
    sectorMesh.rotation.x = Math.PI / 2;
    sectorMesh.position.y = 0.16;
    group.add(sectorMesh);

    // 天干文字
    sector.gan.forEach((gan, i) => {
      const angle = startAngle + (i + 1) * (Math.PI / 8);
      const radius = 3.2;

      // 创建文字精灵
      const canvas = createTextCanvas(gan, sector.color);
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(material);

      sprite.position.set(
        Math.cos(angle) * radius,
        0.2,
        Math.sin(angle) * radius
      );
      sprite.scale.set(0.8, 0.8, 1);
      group.add(sprite);
    });

    // 五行名称
    const nameCanvas = createTextCanvas(sector.name, sector.color, true);
    const nameTexture = new THREE.CanvasTexture(nameCanvas);
    const nameMaterial = new THREE.SpriteMaterial({
      map: nameTexture,
      transparent: true,
    });
    const nameSprite = new THREE.Sprite(nameMaterial);

    const nameAngle = startAngle + Math.PI / 6;
    const nameRadius = 1.8;

    nameSprite.position.set(
      Math.cos(nameAngle) * nameRadius,
      0.25,
      Math.sin(nameAngle) * nameRadius
    );
    nameSprite.scale.set(1.5, 1.5, 1);
    group.add(nameSprite);
  });

  // 中心轴
  const axisGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 16);
  const axisMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    emissive: 0x444444,
    emissiveIntensity: 0.5,
  });
  const axis = new THREE.Mesh(axisGeometry, axisMaterial);
  axis.position.y = -1.5;
  group.add(axis);

  heavenDisk = group;
  scene.add(heavenDisk);
};

// 创建地盘
const createEarthGrid = () => {
  const group = new THREE.Group();
  group.position.y = -1;

  // 地面
  const groundGeometry = new THREE.PlaneGeometry(12, 12);
  const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x111122,
    shininess: 30,
    specular: 0x222244,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  // 网格线
  const gridHelper = new THREE.GridHelper(12, 12, 0x444466, 0x222244);
  gridHelper.position.y = 0.01;
  group.add(gridHelper);

  // 九宫格
  palaces.forEach((palace) => {
    // 宫格立方体
    const boxGeometry = new THREE.BoxGeometry(3.8, 0.2, 3.8);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0x222233,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(palace.x, 0.1, palace.z);
    box.castShadow = true;
    box.receiveShadow = true;
    box.userData = palace;
    group.add(box);

    // 宫格边框
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x666688,
      transparent: true,
      opacity: 0.5,
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.position.set(palace.x, 0.1, palace.z);
    edges.userData = palace;
    group.add(edges);

    // 地支文字
    const zhiCanvas = createTextCanvas(palace.zhi, palace.color);
    const zhiTexture = new THREE.CanvasTexture(zhiCanvas);
    const zhiMaterial = new THREE.SpriteMaterial({
      map: zhiTexture,
      transparent: true,
    });
    const zhiSprite = new THREE.Sprite(zhiMaterial);

    zhiSprite.position.set(palace.x, 0.2, palace.z);
    zhiSprite.scale.set(2, 2, 1);
    zhiSprite.userData = palace;
    group.add(zhiSprite);

    // 宫名
    const nameCanvas = createTextCanvas(palace.name, "#ffffff", true);
    const nameTexture = new THREE.CanvasTexture(nameCanvas);
    const nameMaterial = new THREE.SpriteMaterial({
      map: nameTexture,
      transparent: true,
    });
    const nameSprite = new THREE.Sprite(nameMaterial);

    nameSprite.position.set(palace.x, 0.25, palace.z - 1.2);
    nameSprite.scale.set(1, 0.5, 1);
    nameSprite.userData = palace;
    group.add(nameSprite);
  });

  earthGrid = group;
  scene.add(earthGrid);
};

// 创建文字画布
const createTextCanvas = (text, color, isLarge = false) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const size = isLarge ? 128 : 64;
  canvas.width = size * 2;
  canvas.height = size;

  context.fillStyle = color;
  context.font = `bold ${isLarge ? size : size / 2}px Microsoft YaHei`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, size, size / 2);

  // 添加发光效果
  context.shadowColor = color;
  context.shadowBlur = 10;
  context.fillText(text, size, size / 2);

  return canvas;
};

// 更新连接线
const updateConnections = () => {
  // 清除旧连接线
  connectionLines.forEach((line) => scene.remove(line));
  connectionLines = [];

  if (!showConnections.value) return;

  // 计算当前天盘旋转对应的五行区域
  const rotationDegrees = (currentHeavenRotation * 180) / Math.PI;
  const normalizedRotation = ((rotationDegrees % 360) + 360) % 360;

  heavenData.forEach((sector) => {
    const sectorStart = sector.angle;
    const sectorEnd = sector.angle + 72;

    let sectorStartNorm = sectorStart;
    let sectorEndNorm = sectorEnd;

    if (sectorEnd > 360) {
      sectorStartNorm = sectorStart - 360;
      sectorEndNorm = sectorEnd - 360;
    }

    // 检查当前旋转是否在这个扇形内
    let isInSector = false;
    if (sectorStartNorm < 0) {
      isInSector =
        normalizedRotation >= 360 + sectorStartNorm ||
        normalizedRotation <= sectorEndNorm;
    } else {
      isInSector =
        normalizedRotation >= sectorStartNorm &&
        normalizedRotation <= sectorEndNorm;
    }

    if (isInSector) {
      // 找到对应的连接
      const sectorConnections = connections.filter(
        (conn) => conn.element === sector.name
      );
      activeConnections.value = sectorConnections.map((conn) => ({
        ...conn,
        color: sector.color,
      }));

      // 创建连接线
      sectorConnections.forEach((conn) => {
        const palace = palaces.find((p) => p.zhi.includes(conn.zhi[0]));
        if (palace) {
          // 天盘起始点（扇形边缘）
          const sectorCenterAngle = ((sectorStart + 36) * Math.PI) / 180;
          const startX = Math.cos(sectorCenterAngle) * 4;
          const startZ = Math.sin(sectorCenterAngle) * 4;

          // 连接线
          const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(startX, 3, startZ),
            new THREE.Vector3(startX, 2, startZ),
            new THREE.Vector3(palace.x, 1.5, palace.z),
            new THREE.Vector3(palace.x, 0.3, palace.z),
          ]);

          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(sector.color),
            transparent: true,
            opacity: 0.8,
            linewidth: 2,
          });

          const line = new THREE.Line(geometry, material);
          connectionLines.push(line);
          scene.add(line);

          // 添加小圆球在连接线上
          const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 16);
          const sphereMaterial = new THREE.MeshBasicMaterial({
            color: sector.color,
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

          // 球体沿曲线移动
          sphere.userData = { curve, progress: 0 };
          connectionLines.push(sphere);
          scene.add(sphere);
        }
      });

      currentHeavenSector.value = [sector];
    }
  });
};

// 更新天盘信息
const updateHeavenInfo = () => {
  const rotationDegrees = (currentHeavenRotation * 180) / Math.PI;
  const normalizedRotation = ((rotationDegrees % 360) + 360) % 360;

  heavenData.forEach((sector) => {
    const sectorStart = sector.angle;
    const sectorEnd = sector.angle + 72;

    let sectorStartNorm = sectorStart;
    let sectorEndNorm = sectorEnd;

    if (sectorEnd > 360) {
      sectorStartNorm = sectorStart - 360;
      sectorEndNorm = sectorEnd - 360;
    }

    let isInSector = false;
    if (sectorStartNorm < 0) {
      isInSector =
        normalizedRotation >= 360 + sectorStartNorm ||
        normalizedRotation <= sectorEndNorm;
    } else {
      isInSector =
        normalizedRotation >= sectorStartNorm &&
        normalizedRotation <= sectorEndNorm;
    }

    if (isInSector) {
      currentHeavenSector.value = [sector];
    }
  });
};

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate);

  // 旋转天盘
  if (isRotating.value) {
    const speed = rotationSpeed.value / 1000;
    currentHeavenRotation += speed;
    heavenDisk.rotation.y = currentHeavenRotation;
    updateConnections();
  }

  // 更新连接线上的小球
  connectionLines.forEach((obj) => {
    if (obj.userData?.curve) {
      obj.userData.progress += 0.02;
      if (obj.userData.progress > 1) obj.userData.progress = 0;

      const point = obj.userData.curve.getPoint(obj.userData.progress);
      obj.position.copy(point);
    }
  });

  controls.update();
  composer.render();
};

// 控制方法
const toggleRotation = () => {
  isRotating.value = !isRotating.value;
};

const updateRotationSpeed = () => {
  // 速度已通过rotationSpeed更新
};

const resetView = () => {
  controls.reset();
  camera.position.set(12, 8, 12);
  controls.update();
};

const toggleConnections = () => {
  showConnections.value = !showConnections.value;
  updateConnections();
};

const highlightPalace = (palace) => {
  highlightedPalace.value = palace;
};

const resetPalaceHighlight = () => {
  highlightedPalace.value = null;
};

const isPalaceActive = (palace) => {
  return (
    activeConnections.value.some((conn) => palace.zhi.includes(conn.zhi[0])) ||
    highlightedPalace.value?.id === palace.id
  );
};

// 生命周期
onMounted(() => {
  initScene();

  window.addEventListener("resize", () => {
    if (camera && renderer) {
      camera.aspect =
        container.value.clientWidth / container.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        container.value.clientWidth,
        container.value.clientHeight
      );
      composer.setSize(
        container.value.clientWidth,
        container.value.clientHeight
      );
    }
  });
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
});
</script>

<style scoped lang="scss">
.heaven-earth-system {
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  overflow: hidden;
  position: relative;

  .three-container {
    flex: 1;
    position: relative;

    &::before {
      content: "天";
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 32px;
      color: #4fc3f7;
      font-family: "KaiTi", serif;
      text-shadow: 0 0 20px rgba(79, 195, 247, 0.8);
      z-index: 10;
      pointer-events: none;
    }

    &::after {
      content: "地";
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 32px;
      color: #a1887f;
      font-family: "KaiTi", serif;
      text-shadow: 0 0 20px rgba(161, 136, 127, 0.8);
      z-index: 10;
      pointer-events: none;
    }
  }

  .control-panel {
    width: 400px;
    background: rgba(10, 10, 26, 0.9);
    backdrop-filter: blur(10px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: auto;

    .title {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      h2 {
        margin: 0;
        color: #fff;
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 2px;
      }

      p {
        margin: 8px 0 0;
        color: #4fc3f7;
        font-size: 14px;
        opacity: 0.8;
      }
    }

    .controls {
      .speed-control {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;

        span:first-child {
          color: #aaa;
          font-size: 14px;
          min-width: 80px;
        }

        input[type="range"] {
          flex: 1;
          height: 6px;
          -webkit-appearance: none;
          background: linear-gradient(to right, #1a237e, #4a148c, #880e4f);
          border-radius: 3px;
          outline: none;

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4fc3f7;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(79, 195, 247, 0.8);
          }
        }

        span:last-child {
          color: #4fc3f7;
          font-size: 14px;
          min-width: 40px;
        }
      }

      .buttons {
        display: flex;
        gap: 12px;

        .btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(79, 195, 247, 0.3);
            transform: translateY(-2px);
          }

          &.active {
            background: linear-gradient(135deg, #4fc3f7, #2196f3);
            box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
          }

          &.reset {
            background: rgba(244, 67, 54, 0.1);

            &:hover {
              background: rgba(244, 67, 54, 0.3);
            }
          }
        }
      }
    }

    .current-info {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 20px;

      h3 {
        margin: 0 0 15px;
        color: #4fc3f7;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
      }

      .current-heaven {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .heaven-content {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .sector-info {
            text-align: center;

            .sector-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .gan-info {
              font-size: 16px;
              opacity: 0.9;
              letter-spacing: 4px;
            }
          }
        }
      }

      .current-connections {
        .connections-list {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .connection-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 8px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;

            .gan,
            .zhi {
              font-size: 16px;
              font-weight: bold;
            }

            .conn-icon {
              opacity: 0.7;
            }

            .palace {
              font-size: 12px;
              opacity: 0.6;
            }
          }
        }
      }
    }

    .earth-palaces {
      h3 {
        margin: 0 0 15px;
        color: #a1887f;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
      }

      .palaces-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;

        .palace-item {
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              135deg,
              transparent 0%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 100%
            );
            transform: translateX(-100%);
            transition: transform 0.6s;
          }

          &:hover::before {
            transform: translateX(100%);
          }

          &.active {
            border-color: #4fc3f7;
            box-shadow: 0 0 20px rgba(79, 195, 247, 0.3);
            transform: scale(1.05);
            z-index: 1;
          }

          .palace-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            .number {
              font-size: 12px;
              color: #aaa;
            }

            .name {
              font-size: 14px;
              color: #fff;
              font-weight: bold;
            }
          }

          .palace-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;

            .zhi-display {
              font-size: 20px;
              font-weight: bold;
              color: #fff;
            }

            .element {
              font-size: 12px;
              opacity: 0.9;
            }

            .direction {
              font-size: 10px;
              color: #aaa;
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 1200px) {
  .heaven-earth-system {
    flex-direction: column;

    .control-panel {
      width: 100%;
      height: 300px;
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);

      .earth-palaces .palaces-grid {
        grid-template-columns: repeat(9, 1fr);
      }
    }
  }
}
</style>
