   <el-collapse>
      <el-collapse-item v-for="(item,index) in words" :title="`${index+1}-${item.word}`" :name="index" :key="index">
        <WordItem
            :number="index+1" 
            :word="item.word"
            :definition="item.definition"
            :compose="item.compose" 
            :examples="item.examples">
        </WordItem>
      </el-collapse-item>
    </el-collapse>
    
<script setup>
import { reactive } from 'vue'
import { words } from './words.json'

</script>

<style>

</style>
