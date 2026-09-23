<template>
  <div class="mo-ni-qi-gua">
    <el-tabs v-model="activeTab" class="mo-ni-qi-gua__tabs">
      <el-tab-pane label="大衍揲蓍" name="dayan">
        <DaYanShiCao />
      </el-tab-pane>
      <el-tab-pane label="金钱卦" name="jinqian">
        <JinQianGua />
      </el-tab-pane>
      <el-tab-pane label="梅花易数" name="meihua">
        <MeiHuaYiShu />
      </el-tab-pane>
      <el-tab-pane label="硬币简化" name="coin">
        <YingBiJianHua />
      </el-tab-pane>
      <el-tab-pane label="骰子起卦" name="dice">
        <TouZiQiGua />
      </el-tab-pane>
      <el-tab-pane label="掣签" name="lots">
        <CheQianQiGua />
      </el-tab-pane>
      <el-tab-pane label="姓名笔画" name="name">
        <XingMingBiHua />
      </el-tab-pane>
      <el-tab-pane label="方位／声音" name="dir">
        <FangWeiShengYin />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DaYanShiCao from "./DaYanShiCao.vue";
import JinQianGua from "./JinQianGua.vue";
import MeiHuaYiShu from "./MeiHuaYiShu.vue";
import YingBiJianHua from "./YingBiJianHua.vue";
import TouZiQiGua from "./TouZiQiGua.vue";
import CheQianQiGua from "./CheQianQiGua.vue";
import XingMingBiHua from "./XingMingBiHua.vue";
import FangWeiShengYin from "./FangWeiShengYin.vue";

const activeTab = ref("dayan");
</script>

<style scoped>
.mo-ni-qi-gua {
  margin-top: 0.5rem;
}

.mo-ni-qi-gua__tabs :deep(.el-tabs__nav-wrap) {
  overflow-x: auto;
}
</style>
