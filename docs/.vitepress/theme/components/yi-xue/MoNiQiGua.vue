<template>
  <div class="mo-ni-qi-gua">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="大衍揲蓍" name="dayan">
        <DaYanShiCao />
      </el-tab-pane>
      <el-tab-pane label="金钱卦" name="jinqian">
        <JinQianGua />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DaYanShiCao from "./DaYanShiCao.vue";
import JinQianGua from "./JinQianGua.vue";

const activeTab = ref("dayan");
</script>

<style scoped>
.mo-ni-qi-gua {
  margin-top: 0.5rem;
}
</style>
