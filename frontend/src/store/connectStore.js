import {defineStore} from "pinia";
import {ref} from 'vue'
import {ConnectionList} from "../../wailsjs/go/main/App.js";
import {ElNotification} from "element-plus";
export const connectStore = defineStore('connectStore', () => {
    const connectionList = ref([])
    function GetConnList() {
        ConnectionList().then(res => {
            if (res.code !== 200) {
                ElNotification({
                    title:res.msg,
                    type: "error",
                })
            }
            connectionList.value = res.data
        })
    }
    return {connectionList, GetConnList}
})


