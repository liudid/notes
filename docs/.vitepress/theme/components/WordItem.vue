<template>
  <div class="word__item">
    <el-card>
      <template #header>
        <div class="card__header">
          <div class="card__title">
            <div>
              <!-- <span>({{ props.number }}). </span>&nbsp; -->
              <span>{{ props.word }}</span>
            </div>
            <div>
              <div class="compose" v-if="props.compose">
                <span class="compose__item" v-if="props?.compose?.prefix">
                  <el-tag type="danger">Prefix</el-tag>
                  -<span class="compose--prefix">{{
                    props.compose.prefix
                  }}</span>
                </span>
                <span class="compose__item" v-if="props?.compose?.root">
                  <el-tag type="primary">Root</el-tag>
                  -<span class="compose--root">{{ props.compose.root }}</span>
                </span>
                <span class="compose__item" v-if="props?.compose?.suffix">
                  <el-tag type="warning">Suffix</el-tag>
                  -<span class="compose--suffix">{{
                    props.compose.suffix
                  }}</span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <el-tag
              v-for="item in props.definitions"
              :key="item"
              type="info"
              effect="light"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </template>
      <ul>
        <li v-for="(item, index) in examples" :key="index">
          <dl>
            <dt v-html="item.sentenceHtml"></dt>
            <dd>{{ item.explanation }}</dd>
          </dl>
        </li>
      </ul>
      <template #footer v-if="props.further">{{ props.further }}</template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 编号
  number: {
    type: [String, Number],
    required: true,
  },
  // 单词
  word: {
    type: String,
    required: true,
  },
  // 释义
  definitions: {
    type: Array,
    required: true,
  },
  // 组成
  compose: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 例句
  examples: {
    type: Array,
    required: true,
  },
  // 补充说明
  further: {
    type: String,
  },
});

const examples = props.examples.map((item) => {
  return {
    ...item,
    sentenceHtml: render(item.sentence, (match, key) => {
      return `<span class="example__highlight">${item.highlight}</span>`;
    }),
  };
});

/**
 * string highlight
 * @param {string} template 字符串模板
 * @returns {string} 渲染结果
 */
function render(template, callback) {
  return template.replace(/\{(.*?)\}/g, (match, key) => callback(match, key));
}
</script>

<style lang="scss">
.word__item {
  font-size: 16px;
  .card__header {
    .card__title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
  }
  .example__highlight {
    color: red;
    font-weight: 600;
  }
  .compose {
    font-weight: bold;
    .compose__item {
      margin-right: 20px;
    }
    .compose--prefix {
      color: red;
    }
    .compose--root {
      color: blue;
    }
    .compose--suffix {
      color: purple;
    }
  }
}
</style>
