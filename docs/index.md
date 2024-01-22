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


<script setup lang="ts">
// 在 Markdown 使用 Vue
import { useData, useRoute, useRouter } from 'vitepress'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const dialogVisible = ref(false)
const password = ref('')

function onButtonClick(){
  if(password.value !== '123456.'){
    return ElMessage({
      showClose: true,
      message: 'The password is incorrect.',
      type: 'error',
    })
  }
  ElMessage({
    showClose: true,
    message: '登录成功.',
    type: 'success',
  })
  dialogVisible.value = false
  router.go('/notes/zh/emoji/')
}

</script>

<el-dialog v-model="dialogVisible" title="Account" width="30%" draggable>
    <el-input v-model="password" />
    <template #footer>
     <el-button type="primary" @click="onButtonClick">
        Go
      </el-button>
    </template>
  </el-dialog>
<el-button :class="$style.button" type="primary" plain @click="dialogVisible = true">Login</el-button>

<style module>
.button {
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
