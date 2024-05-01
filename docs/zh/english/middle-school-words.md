   <div class="words">
    <el-collapse>
      <el-collapse-item v-for="(item,index) in words" :name="index" :key="index">
        <template #title>
          <span>{{index+1}}-{{item.word}}</span>
          <!-- <Segmented :value="item.level" :options="options"></Segmented> -->
        </template>
        <WordItem
            :number="index+1" 
            :word="item.word"
            :definitions="item.definitions"
            :compose="item.compose" 
            :examples="item.examples"
            :furthers="item.furthers"
            :level="item.level"
            >
        </WordItem>
      </el-collapse-item>
    </el-collapse>
   </div>
    
    
    
<script setup>
import { reactive } from 'vue'
import { words } from './words.json'

const options = [
  {
    label: '🔴',
    value: '1',
  },
  {
    label: '🟠',
    value: '2',
  },
  {
    label: '🟢',
    value: '3',
  },
  {
    label: '🟣',
    value: '4',
  },
]
</script>

<style lang="scss">
.words{
 .segmented {
    position:absolute;
    right:40px;
  }
}
 
</style>
