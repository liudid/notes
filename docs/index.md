---
# frontmatter - 元数据
layout: home

title: 江初鸭
titleTemplate: 一个记笔记的地方

hero:
  name: 江初鸭
  text: ✏️
  tagline: 一个记笔记的地方 🛠️
  image:
    src: /home.png
    alt: 江初鸭
  actions:
    - theme: brand
      text: Go
      link: /zh/tools/life
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/liudid

features:
  - icon: ☕️
    title: Notes
    details: 记录鸭 📖
    link: "/zh/tools/life"
  - icon: 🛠️
    title: Tutorials
    details: 一些教程 📒
    link: "/zh/tools/life"
  - icon: 📦
    title: Tools
    details: 各种好用工具 🔧
    link: "/zh/tools/life"
---


<script setup>
// 在 Markdown 使用 Vue
import { useData, useRoute, useRouter } from 'vitepress'
import { ref } from 'vue'

const router = useRouter()

function onButtonClick(){
  router.go('/notes/zh/emoji/')
}
const count = ref(0)
</script>

<!-- ## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="onButtonClick">Increment</button> -->

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
