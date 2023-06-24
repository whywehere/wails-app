<template >
  <main v-if="dbStore.keyDB !== undefined">
    <el-dialog
        v-model="keyDialogVisible"
        title="创建键"
        width="60%"
    >
      <el-form :model="keyForm" label-width="120px">
        <el-form-item label="键的名称">
          <el-input placeholder="请输入键的名称" v-model="keyForm.key" />
        </el-form-item>
        <el-form-item label="键的类型">
          <el-select v-model="keyForm.type" placeholder="请选择键的类型">
            <el-option value="string" label="string"></el-option>
            <el-option value="hash" label="hash"></el-option>
            <el-option value="list" label="list"></el-option>
            <el-option value="set" label="set"></el-option>
            <el-option value="zset" label="zset"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createKey">创建</el-button>
          <el-button @click="keyDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.keyword" placeholder="请输入键的信息" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="GetKeyList(form.keyword)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="keyDialogVisible = true" style="width: 100%; margin-bottom: 12px;">创建键</el-button>

    <div id="keys">
      <div v-for="item in keys" @click="dbStore.selectKeyKey(item)">
        <div v-if="item === dbStore.keyKey" class="item key-select-item">
          <div class="key-item-name">{{item}}</div>
          <el-popconfirm title="确认删除?" @confirm="deleteKey(item)">
            <template #reference>
              <el-button text type="danger" @click.stop>删除</el-button>
            </template>
          </el-popconfirm>
        </div>
        <div v-else class="item key-item">
          <div class="key-item-name">{{item}}</div>
          <el-popconfirm title="确认删除?" @confirm="deleteKey(item)">
            <template #reference>
              <el-button text type="danger" @click.stop>删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {CreateKeyValue, DeleteKeyValue, KeyList} from "../../wailsjs/go/main/App.js";
import {reactive, ref, watch} from 'vue'
import {ElNotification} from "element-plus";
import {databaseStore} from "../store/databaseStore.js";

const keys = ref([])
const dbStore = databaseStore()
const form = reactive({
  keyword: '',
})
let keyDialogVisible = ref(false)
let keyForm = ref({})


watch(dbStore, ()=> {
  GetKeyList(form.keyword)
})

function GetKeyList(keyWord) {
  KeyList({conn_identity:dbStore.keyConnIdentity, db:dbStore.keyDB, keyword:keyWord}).then(res => {
    if (res.code !== 200) {
      ElNotification({
        title: res.msg,
        type: "error",
      })
    }
      keys.value = res.data
  })
}
function deleteKey() {
  DeleteKeyValue({conn_identity: dbStore.keyConnIdentity, db: dbStore.keyDB, key: dbStore.keyKey}).then(res => {
    if (res.code !== 200) {
      ElNotification({
        title:res.msg,
        type: "error",
      })
      return
    }
    ElNotification({
      title:res.msg,
      type: "success",
    })
    GetKeyList(form.keyword)
  })
}

function createKey() {
  CreateKeyValue({conn_identity: dbStore.keyConnIdentity, db: dbStore.keyDB, key: keyForm.value.key, type: keyForm.value.type}).then(res => {
    if (res.code !== 200) {
      ElNotification({
        title:res.msg,
        type: "error",
      })
      return
    }
    ElNotification({
      title:res.msg,
      type: "success",
    })
    GetKeyList(form.keyword)
    keyDialogVisible.value = false
  })
}
</script>


<style scoped>
#keys {
  overflow: auto;
  max-height: 75vh;
}
.key-item {
  color: #409eff;
  background-color: #ecf5ff;
  margin-bottom: 5px;
}
.key-item-name {
  padding: 5px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.key-select-item {
  color: #67c23a;
  background-color: #f0f9eb;
  margin-bottom: 5px;
}
</style>