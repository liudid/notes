   
   <el-collapse>
      <el-collapse-item v-for="(item,index) in words" :title="`${index+1}-${item.word}`" :name="index" :key="index">
        <WordItem
            :number="index+1" 
            :word="item.word"
            :definitions="item.definitions"
            :compose="item.compose" 
            :examples="item.examples"
            :furthers="item.furthers"
            :level="item.level"
            @on-segmented-change="onSegmentedChange"
            >
        </WordItem>
      </el-collapse-item>
    </el-collapse>
    
    
    
<script setup>
import { reactive } from 'vue'
import { words } from './words.json'


function onSegmentedChange(value){
  console.log(value)
}
</script>

<style>

</style>
