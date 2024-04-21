  <div>
      <el-button @click="addWord">添加</el-button>
  </div>
  <el-table border :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="100" />
    <el-table-column prop="word" label="word" width="180" />
    <el-table-column prop="address" label="操作" #default="{row, $index}">
      <el-button @click="updateWord(row,$index)">编辑</el-button>
      <el-button @click="deleteWord(row,$index)">删除</el-button>
    </el-table-column>
  </el-table>

<el-dialog v-model="dialogVisible" title="w" width="700">
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="word" required>
      <el-input v-model="form.word" />
    </el-form-item>
    <el-form-item label="definitions" required>
      <div v-for="(item, index) in form.definitions" style="width:100%;margin-bottom:10px;">
        <el-input v-model="item.desc" />
        <el-button type="danger" @click="deleteDefinition(index)">删除</el-button>
      </div>
      <div style="width:100%"><el-button type="primary" @click="addDefinition(index)">添加</el-button></div>
    </el-form-item>
     <el-form-item label="compose-prefix">
      <el-input v-model="form.compose.prefix" />
    </el-form-item>
     <el-form-item label="compose-root">
      <el-input v-model="form.compose.root" />
    </el-form-item>
     <el-form-item label="compose-suffix">
      <el-input v-model="form.compose.suffix" />
    </el-form-item>
    <el-form-item label="examples" required>
      <div v-for="(item, index) in form.examples" style="width:100%;border:1px solid #000;padding:10px;margin-bottom:10px;">
        <div>
          sentence:<el-input  type="textarea" v-model="item.sentence" />
        </div>
          <div>
          explanation:<el-input  type="textarea" v-model="item.explanation" />
        </div>
          <div>
          highlight:<el-input v-model="item.highlight" />
        </div>
        <div style="width:100%"><el-button type="danger" @click="deleteExample(index)">删除</el-button></div>
      </div>
        <el-button type="primary" @click="addExample(index)">添加</el-button>
    </el-form-item>
    <!-- <el-form-item label="further">
      <el-input type="textarea" v-model="form.further"  />
    </el-form-item> -->
    <el-form-item label="furthers">
      <el-tag
        v-for="(tag,index) in form.furthers"
        :key="tag.item"
        closable
        :disable-transitions="false"
        @close="handleClose(index)"
      >
        {{ tag.item }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + New Further
      </el-button>
    </el-form-item>
    
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

<script setup>
import { ref,reactive,onMounted,nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { words } from '../../zh/english/words.json'

const tableData = reactive([])

const dialogVisible = ref(false)

console.log(1)
const form = reactive({
  word:'',
  definitions:[
    { desc:'' }
  ],
  compose:{
    prefix:'',
    root:'',
    suffix:'',
  },
  examples: [
    {
      sentence:'',
      explanation:'',
      highlight:'',
    }
  ],
  furthers:[]
})

const activeType = {
  ADD:Symbol(),
  UPDATE:Symbol(),
}

const formType = ref(null)

const activeIndex = ref(0)

async function init(){
  const response  = await fetch('http://localhost:9292/api/words')
  const data = await response.json()
  Object.assign(tableData,data.words)
}
init()

function addWord(){
  formType.value = activeType.ADD
  dialogVisible.value = true
}

async function deleteWord(item,index){
  const params = new URLSearchParams();
  params.append('index', index);
  const response  = await fetch('http://localhost:9292/api/word-delete?'+ params.toString())
}

async function updateWord(row,index){
  dialogVisible.value = true
  formType.value = activeType.UPDATE
  const params = new URLSearchParams();
  params.append('word', row.word);
  const response  = await fetch('http://localhost:9292/api/word-get?'+ params.toString())
  let data = await response.json()
  data.definitions = data.definitions.map(item=>({desc:item}))
  data.examples.forEach(item=>{
    item.sentence = item.sentence.replace(/\{([^}]+)\}/g, '$1');
  })
  data.furthers = data.furthers.map(item=>({item:item}))
  Object.assign(form, data)
  activeIndex.value = index
}

function addDefinition(index){
  form.definitions.push({desc:''})
}
function deleteDefinition(index){
  if(form.definitions.length <= 1){
    return ElMessage.error('至少有一个')
  }
  form.definitions.splice(index,1)
}

function addExample(index){
    form.examples.push({
      sentence:'',
      explanation:'',
      highlight:'',
    })
}
function deleteExample(index){
  if(form.examples.length <= 1){
    return ElMessage.error('至少有一个')
  }
  form.examples.splice(index,1)
}

const InputRef = ref(null)
const inputVisible = ref(false)
const inputValue = ref('')

function showInput(){
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}
function handleInputConfirm(){
   if (inputValue.value) {
    form.furthers.push({item:inputValue.value})
  }
  inputVisible.value = false
  inputValue.value = ''
}
function handleClose(index){
  form.furthers.splice(index,1)
}

async function onConfirm(){
  if(form.word.trim() === '') return ElMessage.error('请填写word')
  const notDefinitions = form.definitions.filter(item=>item.desc.trim() === '')
  if(notDefinitions.length){
    return ElMessage.error('请填写definition')
  }
  const notExamples = form.examples.filter(item=>{
    return item.sentence.trim() === '' || 
          item.explanation.trim() === '' || 
         item.highlight.trim() === ''
  })
  if(notExamples.length){
    return ElMessage.error('请填写example')
  }

  const data = {
    word:form.word,
    definitions:form.definitions.map(item=>item.desc),
    compose:form.compose,
    examples:form.examples,
    furthers:form.furthers.map(item=>item.item),
  }
  return

  if(formType.value === activeType.ADD){
    const wordNames = words.map(item=>item.word)
    if(wordNames.includes(data.word)) return ElMessage.error('word已存在！')
    data.examples.forEach(example=>{
      const regex = new RegExp(`\\b${example.highlight}\\b`, 'g');
      example.sentence = example.sentence.replace(regex, `{${example.highlight}}`);
    })
     const response  = await fetch('http://localhost:9292/api/word-add',{ 
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      mode:'cors',
      body: JSON.stringify(data)
      }
    )
  }else if(formType.value === activeType.UPDATE){
    const cloneForm = JSON.parse(JSON.stringify(data))
    cloneForm.activeIndex = activeIndex.value
    cloneForm.examples.forEach(example=>{
      const regex = new RegExp(`\\b${example.highlight}\\b`, 'g');
      example.sentence = example.sentence.replace(regex, `{${example.highlight}}`);
    })
     const response  = await fetch('http://localhost:9292/api/word-update',{ 
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      mode:'cors',
      body: JSON.stringify(cloneForm)
      }
    )
  }
}



</script>

<style>


  table{
    margin:0 !important;
  }
</style>
