<template>
  <main>
    <div class="demo-collapse">
      <el-collapse accordion>
        <el-collapse-item v-for="item in connStore.connectionList" :name="item.identity" @click="getInfo(item.identity)">
          <template #title>
            <div class="item">
              <div>
                {{ item.name }}
              </div>
              <div style="display: flex">
                <DbInfo @click.stop :data="item"></DbInfo>
                <ConnectionManage @click.stop title="编辑" btn-type="text" :data="item"/>
                <el-popconfirm title="确认删除?" @confirm="connectionDelete(item.identity)">
                  <template #reference>
                    <el-button link type="danger" @click.stop>删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </template>
          <div id="dbs">
            <div v-for="db in infoDbList" @click.stop="selectDB(db.key, item.identity)">
              <div v-if="db.key !== selectDbKey" class="my-item">{{db.key}} ( {{db.number}} )</div>
              <div v-else class="my-select-item">{{db.key}} ( {{db.number}} )</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </main>
</template>

<script setup>
import {ref, watch} from "vue";
import {ConnectionDelete, ConnectionList, DbList} from "../../wailsjs/go/main/App.js";
import {ElNotification} from "element-plus"
import ConnectionManage from "./ConnectionManage.vue";
import DbInfo from "./DbInfo.vue";
import {connectStore} from "../store/connectStore.js";
const connStore = connectStore()
import {databaseStore} from "../store/databaseStore.js";
const dbStore = databaseStore()
let infoDbList = ref()
let selectDbKey = ref()
connStore.GetConnList()
watch(connStore, (newFlush)=>{
  connStore.GetConnList()
})

// 删除连接
function connectionDelete(identity) {
  ConnectionDelete(identity).then(res => {
    if (res.code !== 200) {
      ElNotification({
        title:res.msg,
        type: "error",
      })
    }
    ElNotification({
      title:res.msg,
      type: "success",
    })
    connStore.GetConnList()
  })
}

// 获取基本信息
function getInfo(identity) {
  // 获取数据库列表
  infoDbList.value = []
  DbList(identity).then(res => {
    if (res.code !== 200) {
      ElNotification({
        title:res.msg,
        type: "error",
      })
    }
    infoDbList.value = res.data
  })
}

// 选中数据库
function selectDB(db, connIdentity) {
  selectDbKey.value = db
  dbStore.selectDB(Number(db.substring(2)), connIdentity)
}
</script>



<style scoped>
#dbs {
  overflow: auto;
  max-height: 75vh;
}
</style>