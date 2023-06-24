<script setup>
import ConnectionList from "./components/ConnectionList.vue";
import ConnectionManage from "./components/ConnectionManage.vue";
import {ref} from "vue";
import {CreateKeyValue, DbList, GetKeyValue, KeyList} from "../wailsjs/go/main/App.js";
import Keys from "./components/Keys.vue";
import KeyValue from "./components/KeyValue.vue";
import {connectStore} from "./store/connectStore.js";
const store = connectStore()
import {databaseStore} from "./store/databaseStore.js";
const dbstore = databaseStore()
let keyDB = ref()
let keyConnIdentity = ref()
let keyKey = ref()

// 选中键
function selectKey(key) {
  dbstore.keyKey = key
}

</script>

<template>
  <el-row>
    <el-col :span="5" style="height: 100vh; padding: 12px">
      <div style="margin-bottom: 12px">
        <ConnectionManage title="新建连接" btn-type="primary"/>
      </div>
      <ConnectionList/>
    </el-col>
    <el-col :span="7" style="padding: 12px">
      <Keys/>
    </el-col>
    <el-col :span="12" style="padding: 12px">
      <KeyValue/>
    </el-col>
  </el-row>
</template>

<style>
</style>
