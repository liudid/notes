<template>
  <div class="chinese-calendar-container">
    <div class="header">
      <h2><i class="el-icon-data-analysis"></i> 地支节气五行对应关系表</h2>
      <el-tag type="info">传统节气文化与五行阴阳学说</el-tag>
    </div>

    <!-- 筛选控制区域 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="filter-item">
            <span class="filter-label">五行筛选：</span>
            <el-select
              v-model="selectedWuXing"
              multiple
              placeholder="选择五行"
              clearable
            >
              <el-option
                v-for="item in wuxingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span class="wuxing-option" :class="`wuxing-${item.value}`">
                  <i :class="item.icon"></i> {{ item.label }}
                </span>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="filter-item">
            <span class="filter-label">阴阳筛选：</span>
            <el-select
              v-model="selectedYinYang"
              placeholder="选择阴阳"
              clearable
            >
              <el-option label="阳" value="阳"></el-option>
              <el-option label="阴" value="阴"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="filter-item">
            <span class="filter-label">季节筛选：</span>
            <el-select
              v-model="selectedSeason"
              placeholder="选择季节"
              clearable
            >
              <el-option
                v-for="season in seasonOptions"
                :key="season.value"
                :label="season.label"
                :value="season.value"
              >
                <span :class="`season-${season.value}`">{{
                  season.label
                }}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="resetFilters" icon="el-icon-refresh"
            >重置筛选</el-button
          >
          <el-button @click="exportData" icon="el-icon-download"
            >导出数据</el-button
          >
        </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table
        :data="filteredData"
        border
        stripe
        style="width: 100%"
        row-class-name="table-row"
        header-row-class-name="table-header"
      >
        <el-table-column prop="branch" label="地支" width="100" fixed>
          <template #default="scope">
            <div class="branch-cell" :class="getBranchClass(scope.row)">
              <div class="branch-icon">
                <i :class="scope.row.branchIcon"></i>
              </div>
              <div class="branch-content">
                <div class="branch-name">{{ scope.row.branch }}</div>
                <div class="wuxing-yinyang">
                  <el-tag
                    :class="`wuxing-tag wuxing-${scope.row.wuxing}`"
                    size="small"
                  >
                    {{ scope.row.wuxing }}
                  </el-tag>
                  <el-tag
                    :class="scope.row.yinyang === '阳' ? 'yang-tag' : 'yin-tag'"
                    size="small"
                  >
                    {{ scope.row.yinyang }}
                  </el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="season" label="四季" width="120">
          <template #default="scope">
            <el-tag
              :type="getSeasonTagType(scope.row.season)"
              effect="dark"
              class="season-tag"
            >
              <i :class="scope.row.seasonIcon"></i> {{ scope.row.season }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="solarTerm" label="节气" width="150">
          <template #default="scope">
            <div class="solar-term-cell" :class="getTermClass(scope.row)">
              <div class="term-name">{{ scope.row.solarTerm }}</div>
              <div class="term-date">{{ scope.row.solarTermDate }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="energyNode" label="气机节点" min-width="180">
          <template #default="scope">
            <div class="energy-node">
              <div class="energy-title">{{ scope.row.energyTitle }}</div>
              <div class="energy-desc">{{ scope.row.energyDesc }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="zodiac" label="生肖" width="120">
          <template #default="scope">
            <div class="zodiac-cell">
              <div class="zodiac-icon">
                <i :class="scope.row.zodiacIcon"></i>
              </div>
              <div class="zodiac-name">{{ scope.row.zodiac }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="longitude" label="太阳黄经" width="130">
          <template #default="scope">
            <div class="longitude-cell">
              <el-progress
                :percentage="scope.row.longitudePercent"
                :color="getLongitudeColor(scope.row)"
                :show-text="false"
                style="margin-bottom: 5px"
              />
              <span>{{ scope.row.longitude }}°</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="month" label="月份" width="120">
          <template #default="scope">
            <div class="month-cell" :class="getMonthClass(scope.row)">
              <div class="month-name">{{ scope.row.month }}</div>
              <div class="month-number">{{ scope.row.monthNumber }}月</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button
              type="text"
              @click="showDetail(scope.row)"
              icon="el-icon-info"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 统计信息 -->
    <div class="stats-section">
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.title">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-icon" :class="stat.iconClass">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-content">
                <div class="stat-title">{{ stat.title }}</div>
                <div class="stat-value">{{ stat.value }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      :title="`${currentDetail.branch} - ${currentDetail.zodiac} 详情`"
      v-model="detailVisible"
      width="600px"
    >
      <div class="detail-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="detail-section">
              <h4><i class="el-icon-info"></i> 基本信息</h4>
              <div class="detail-item">
                <span class="detail-label">地支：</span>
                <el-tag :class="getBranchClass(currentDetail)">{{
                  currentDetail.branch
                }}</el-tag>
              </div>
              <div class="detail-item">
                <span class="detail-label">五行：</span>
                <el-tag :class="`wuxing-tag wuxing-${currentDetail.wuxing}`">{{
                  currentDetail.wuxing
                }}</el-tag>
              </div>
              <div class="detail-item">
                <span class="detail-label">阴阳：</span>
                <el-tag
                  :class="
                    currentDetail.yinyang === '阳' ? 'yang-tag' : 'yin-tag'
                  "
                >
                  {{ currentDetail.yinyang }}
                </el-tag>
              </div>
              <div class="detail-item">
                <span class="detail-label">生肖：</span>
                <span class="detail-value">{{ currentDetail.zodiac }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="detail-section">
              <h4><i class="el-icon-date"></i> 节气信息</h4>
              <div class="detail-item">
                <span class="detail-label">节气：</span>
                <span class="detail-value">{{ currentDetail.solarTerm }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">时间：</span>
                <span class="detail-value">{{
                  currentDetail.solarTermDate
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">月份：</span>
                <span class="detail-value">{{ currentDetail.month }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">黄经：</span>
                <span class="detail-value">{{ currentDetail.longitude }}°</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="detail-section energy-section">
          <h4><i class="el-icon-wind-power"></i> 气机节点解析</h4>
          <div class="energy-detail">
            <div class="energy-title">{{ currentDetail.energyTitle }}</div>
            <div class="energy-full-desc">{{ currentDetail.energyDesc }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";

// 数据定义
const calendarData = ref([
  {
    branch: "子",
    branchIcon: "el-icon-moon-night",
    wuxing: "水",
    yinyang: "阳",
    season: "冬",
    seasonIcon: "el-icon-cold-drink",
    solarTerm: "大雪、冬至",
    solarTermDate: "12月7日、12月22日",
    energyTitle: "冬至：一阳初生",
    energyDesc: "阴极而阳生，万物收藏，阳气始萌",
    zodiac: "鼠",
    zodiacIcon: "el-icon-mouse",
    longitude: "270°",
    longitudePercent: 75,
    month: "十一月",
    monthNumber: 11,
  },
  {
    branch: "丑",
    branchIcon: "el-icon-goblet-square",
    wuxing: "土",
    yinyang: "阴",
    season: "冬",
    seasonIcon: "el-icon-cold-drink",
    solarTerm: "小寒、大寒",
    solarTermDate: "1月5日、1月20日",
    energyTitle: "大寒：阴气极致",
    energyDesc: "寒气至极，阳气潜伏，准备生发",
    zodiac: "牛",
    zodiacIcon: "el-icon-cherry",
    longitude: "300°",
    longitudePercent: 83,
    month: "十二月",
    monthNumber: 12,
  },
  {
    branch: "寅",
    branchIcon: "el-icon-chat-line-square",
    wuxing: "木",
    yinyang: "阳",
    season: "春",
    seasonIcon: "el-icon-flower",
    solarTerm: "立春、雨水",
    solarTermDate: "2月4日、2月19日",
    energyTitle: "立春：阳气初升",
    energyDesc: "阳气上升，万物复苏，生机始发",
    zodiac: "虎",
    zodiacIcon: "el-icon-chicken",
    longitude: "330°",
    longitudePercent: 92,
    month: "正月",
    monthNumber: 1,
  },
  {
    branch: "卯",
    branchIcon: "el-icon-brush",
    wuxing: "木",
    yinyang: "阴",
    season: "春",
    seasonIcon: "el-icon-flower",
    solarTerm: "惊蛰、春分",
    solarTermDate: "3月5日、3月20日",
    energyTitle: "春分：阴阳平衡",
    energyDesc: "昼夜平分，阴阳调和，万物生长",
    zodiac: "兔",
    zodiacIcon: "el-icon-goblet",
    longitude: "0°",
    longitudePercent: 0,
    month: "二月",
    monthNumber: 2,
  },
  {
    branch: "辰",
    branchIcon: "el-icon-present",
    wuxing: "土",
    yinyang: "阳",
    season: "春",
    seasonIcon: "el-icon-flower",
    solarTerm: "清明、谷雨",
    solarTermDate: "4月4日、4月20日",
    energyTitle: "清明：清气上升",
    energyDesc: "天气清朗，地气上升，万物洁净",
    zodiac: "龙",
    zodiacIcon: "el-icon-sunny",
    longitude: "30°",
    longitudePercent: 8,
    month: "三月",
    monthNumber: 3,
  },
  {
    branch: "巳",
    branchIcon: "el-icon-dish",
    wuxing: "火",
    yinyang: "阴",
    season: "夏",
    seasonIcon: "el-icon-sunny",
    solarTerm: "立夏、小满",
    solarTermDate: "5月5日、5月21日",
    energyTitle: "立夏：阳气旺盛",
    energyDesc: "阳气旺盛，万物繁茂，生长加速",
    zodiac: "蛇",
    zodiacIcon: "el-icon-dessert",
    longitude: "60°",
    longitudePercent: 17,
    month: "四月",
    monthNumber: 4,
  },
  {
    branch: "午",
    branchIcon: "el-icon-sunrise",
    wuxing: "火",
    yinyang: "阳",
    season: "夏",
    seasonIcon: "el-icon-sunny",
    solarTerm: "芒种、夏至",
    solarTermDate: "6月5日、6月21日",
    energyTitle: "夏至：阳极阴生",
    energyDesc: "阳气至极，阴气始生，万物盛极",
    zodiac: "马",
    zodiacIcon: "el-icon-headset",
    longitude: "90°",
    longitudePercent: 25,
    month: "五月",
    monthNumber: 5,
  },
  {
    branch: "未",
    branchIcon: "el-icon-sunrise-1",
    wuxing: "土",
    yinyang: "阴",
    season: "夏",
    seasonIcon: "el-icon-sunny",
    solarTerm: "小暑、大暑",
    solarTermDate: "7月7日、7月23日",
    energyTitle: "大暑：湿热极致",
    energyDesc: "湿热至极，万物成熟，准备收获",
    zodiac: "羊",
    zodiacIcon: "el-icon-milk-tea",
    longitude: "120°",
    longitudePercent: 33,
    month: "六月",
    monthNumber: 6,
  },
  {
    branch: "申",
    branchIcon: "el-icon-moon",
    wuxing: "金",
    yinyang: "阳",
    season: "秋",
    seasonIcon: "el-icon-grape",
    solarTerm: "立秋、处暑",
    solarTermDate: "8月7日、8月23日",
    energyTitle: "立秋：阳气收敛",
    energyDesc: "阳气收敛，阴气上升，万物成熟",
    zodiac: "猴",
    zodiacIcon: "el-icon-ice-cream",
    longitude: "150°",
    longitudePercent: 42,
    month: "七月",
    monthNumber: 7,
  },
  {
    branch: "酉",
    branchIcon: "el-icon-moon-night",
    wuxing: "金",
    yinyang: "阴",
    season: "秋",
    seasonIcon: "el-icon-grape",
    solarTerm: "白露、秋分",
    solarTermDate: "9月7日、9月23日",
    energyTitle: "秋分：阴阳平衡",
    energyDesc: "昼夜平分，阴阳平衡，万物收敛",
    zodiac: "鸡",
    zodiacIcon: "el-icon-coffee",
    longitude: "180°",
    longitudePercent: 50,
    month: "八月",
    monthNumber: 8,
  },
  {
    branch: "戌",
    branchIcon: "el-icon-star-off",
    wuxing: "土",
    yinyang: "阳",
    season: "秋",
    seasonIcon: "el-icon-grape",
    solarTerm: "寒露、霜降",
    solarTermDate: "10月8日、10月23日",
    energyTitle: "霜降：阴气加重",
    energyDesc: "阴气加重，阳气收藏，万物肃杀",
    zodiac: "狗",
    zodiacIcon: "el-icon-food",
    longitude: "210°",
    longitudePercent: 58,
    month: "九月",
    monthNumber: 9,
  },
  {
    branch: "亥",
    branchIcon: "el-icon-cloudy-and-sunny",
    wuxing: "水",
    yinyang: "阴",
    season: "冬",
    seasonIcon: "el-icon-cold-drink",
    solarTerm: "立冬、小雪",
    solarTermDate: "11月7日、11月22日",
    energyTitle: "立冬：阴气主事",
    energyDesc: "阴气主事，阳气收藏，万物闭藏",
    zodiac: "猪",
    zodiacIcon: "el-icon-watermelon",
    longitude: "240°",
    longitudePercent: 67,
    month: "十月",
    monthNumber: 10,
  },
]);

// 筛选条件
const selectedWuXing = ref([]);
const selectedYinYang = ref("");
const selectedSeason = ref("");

// 筛选选项
const wuxingOptions = [
  { value: "木", label: "木", icon: "el-icon-leaf" },
  { value: "火", label: "火", icon: "el-icon-hot-water" },
  { value: "土", label: "土", icon: "el-icon-box" },
  { value: "金", label: "金", icon: "el-icon-coin" },
  { value: "水", label: "水", icon: "el-icon-water-cup" },
];

const seasonOptions = [
  { value: "春", label: "春季" },
  { value: "夏", label: "夏季" },
  { value: "秋", label: "秋季" },
  { value: "冬", label: "冬季" },
];

// 详情对话框
const detailVisible = ref(false);
const currentDetail = ref({});

// 统计信息
const stats = computed(() => [
  {
    title: "地支总数",
    value: calendarData.value.length,
    icon: "el-icon-collection",
    iconClass: "stat-icon-1",
  },
  {
    title: "五行分布",
    value: new Set(calendarData.value.map((item) => item.wuxing)).size,
    icon: "el-icon-set-up",
    iconClass: "stat-icon-2",
  },
  {
    title: "阴阳比例",
    value: `${
      calendarData.value.filter((item) => item.yinyang === "阳").length
    }阳 / ${
      calendarData.value.filter((item) => item.yinyang === "阴").length
    }阴`,
    icon: "el-icon-data-line",
    iconClass: "stat-icon-3",
  },
  {
    title: "季节分布",
    value: new Set(calendarData.value.map((item) => item.season)).size,
    icon: "el-icon-tickets",
    iconClass: "stat-icon-4",
  },
]);

// 筛选后的数据
const filteredData = computed(() => {
  return calendarData.value.filter((item) => {
    const wuxingMatch =
      selectedWuXing.value.length === 0 ||
      selectedWuXing.value.includes(item.wuxing);
    const yinyangMatch =
      !selectedYinYang.value || item.yinyang === selectedYinYang.value;
    const seasonMatch =
      !selectedSeason.value || item.season === selectedSeason.value;
    return wuxingMatch && yinyangMatch && seasonMatch;
  });
});

// 获取地支样式类
const getBranchClass = (row) => {
  return `branch-${row.branch} wuxing-${row.wuxing} yinyang-${row.yinyang}`;
};

// 获取节气样式类
const getTermClass = (row) => {
  return `term-${
    row.solarTerm.includes("冬至")
      ? "dongzhi"
      : row.solarTerm.includes("春分")
      ? "chunfen"
      : row.solarTerm.includes("夏至")
      ? "xiazhi"
      : row.solarTerm.includes("秋分")
      ? "qiufen"
      : "normal"
  }`;
};

// 获取季节标签类型
const getSeasonTagType = (season) => {
  const types = { 春: "success", 夏: "warning", 秋: "", 冬: "info" };
  return types[season] || "";
};

// 获取月份样式类
const getMonthClass = (row) => {
  return `month-${row.monthNumber}`;
};

// 获取黄经颜色
const getLongitudeColor = (row) => {
  const percent = row.longitudePercent;
  if (percent < 25) return "#91cc75"; // 春
  if (percent < 50) return "#fac858"; // 夏
  if (percent < 75) return "#ee6666"; // 秋
  return "#73c0de"; // 冬
};

// 显示详情
const showDetail = (row) => {
  currentDetail.value = row;
  detailVisible.value = true;
};

// 重置筛选
const resetFilters = () => {
  selectedWuXing.value = [];
  selectedYinYang.value = "";
  selectedSeason.value = "";
};

// 导出数据
const exportData = () => {
  ElMessage.success("数据导出功能开发中...");
};

// 初始化
onMounted(() => {
  console.log("地支节气组件已加载");
});
</script>

<style scoped>
.chinese-calendar-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header h2 {
  margin: 0;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-weight: bold;
  color: #606266;
  white-space: nowrap;
}

.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 地支单元格样式 */
.branch-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.branch-cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.branch-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  color: white;
}

.branch-content {
  flex: 1;
}

.branch-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.wuxing-yinyang {
  display: flex;
  gap: 6px;
}

/* 五行颜色定义 */
.wuxing-木 .branch-icon {
  background: #67c23a;
}
.wuxing-火 .branch-icon {
  background: #e6a23c;
}
.wuxing-土 .branch-icon {
  background: #909399;
}
.wuxing-金 .branch-icon {
  background: #f56c6c;
}
.wuxing-水 .branch-icon {
  background: #409eff;
}

/* 五行标签 */
.wuxing-tag {
  font-weight: bold;
  border: none !important;
  color: white !important;
}

.wuxing-木 {
  background: linear-gradient(135deg, #67c23a, #95d475) !important;
}
.wuxing-火 {
  background: linear-gradient(135deg, #e6a23c, #f3d19e) !important;
}
.wuxing-土 {
  background: linear-gradient(135deg, #909399, #c0c4cc) !important;
}
.wuxing-金 {
  background: linear-gradient(135deg, #f56c6c, #fab6b6) !important;
}
.wuxing-水 {
  background: linear-gradient(135deg, #409eff, #a0cfff) !important;
}

/* 阴阳标签 */
.yang-tag {
  background: linear-gradient(135deg, #ff6b6b, #ffa8a8) !important;
  color: white !important;
  border: none !important;
}

.yin-tag {
  background: linear-gradient(135deg, #4d96ff, #6bc5ff) !important;
  color: white !important;
  border: none !important;
}

/* 季节标签 */
.season-tag {
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.season-春 {
  color: #67c23a;
}
.season-夏 {
  color: #e6a23c;
}
.season-秋 {
  color: #f56c6c;
}
.season-冬 {
  color: #409eff;
}

/* 节气单元格 */
.solar-term-cell {
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.solar-term-cell:hover {
  transform: scale(1.05);
}

.term-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.term-date {
  font-size: 12px;
  color: #909399;
}

.term-dongzhi {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
.term-chunfen {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
}
.term-xiazhi {
  background: linear-gradient(135deg, #fff3e0, #ffcc80);
}
.term-qiufen {
  background: linear-gradient(135deg, #fbe9e7, #ffab91);
}
.term-normal {
  background: linear-gradient(135deg, #f5f5f5, #eeeeee);
}

/* 气机节点 */
.energy-node {
  padding: 10px;
  background: linear-gradient(135deg, #fdfcfb, #f5f7fa);
  border-radius: 6px;
  border-left: 4px solid #409eff;
}

.energy-title {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 4px;
}

.energy-desc {
  font-size: 12px;
  color: #606266;
}

/* 生肖单元格 */
.zodiac-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.zodiac-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #409eff;
  border-radius: 50%;
  color: white;
  font-size: 18px;
}

.zodiac-name {
  font-weight: bold;
  font-size: 16px;
}

/* 月份单元格 */
.month-cell {
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.month-cell:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.month-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.month-number {
  font-size: 12px;
  color: #909399;
}

/* 统计区域 */
.stats-section {
  margin-top: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  color: white;
}

.stat-icon-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.stat-icon-2 {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}
.stat-icon-3 {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}
.stat-icon-4 {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

/* 详情对话框 */
.detail-content {
  padding: 10px;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h4 {
  margin-bottom: 15px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
}

.detail-label {
  font-weight: bold;
  color: #606266;
  min-width: 80px;
}

.detail-value {
  color: #2c3e50;
  font-weight: 500;
}

.energy-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 20px;
  border-radius: 10px;
}

.energy-detail {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.energy-full-desc {
  line-height: 1.8;
  color: #2c3e50;
  font-size: 14px;
}

/* 表格行样式 */
:deep(.table-row) {
  transition: all 0.3s ease;
}

:deep(.table-row:hover) {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef) !important;
  transform: scale(1.01);
}

:deep(.table-header th) {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: white !important;
  font-weight: bold !important;
  text-align: center !important;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .filter-section .el-col {
    margin-bottom: 10px;
  }

  .stats-section .el-col {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .filter-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .branch-cell {
    flex-direction: column;
    text-align: center;
  }
}
</style>
