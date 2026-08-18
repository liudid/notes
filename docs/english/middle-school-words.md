   <div class="words">
    <div class="switch">
      <el-switch
      v-model="value"
      size="large"
      active-text="全部展开"
      inactive-text="全部折叠"
      @change="onSwitchChange"
      />
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="(item,index) in words" :name="index" :key="index">
        <template #title>
          <span>{{index+1}}.&nbsp;&nbsp;{{item.word}}</span>
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
import { ref, reactive } from 'vue'
import { words } from './words.json'

const activeNames = ref([])

const handleChange = ()=>{}

const value = ref(false)

const onSwitchChange = (value)=>{
  if(value){
  const arr = []
  words.forEach((item,index)=>arr.push(index))
  activeNames.value = arr
  }else{
  activeNames.value = []
}

}
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
.VPDoc.has-sidebar.has-aside{
  /* background-color:#f5f5d5; */
  .el-collapse-item__header{
    /* background-color:#f5f5d5 !important; */
  }
  .el-collapse-item__wrap{
    /* background-color:#f5f5d5 !important; */
  }
  .el-card{
    background-color:rgb(241, 241, 239) !important;
  }
}
.words{
  .switch{
    text-align:right;
  }
 .segmented {
    position:absolute;
    right:40px;
  }
}
 
</style>
