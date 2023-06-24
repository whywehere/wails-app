import {defineStore} from "pinia";
import {ref} from 'vue'


export const databaseStore = defineStore('databaseStore', () => {
    const keyDB = ref()
    const selectKey = ref()
    const keyConnIdentity = ref()
    const keyKey = ref()

    function selectDB (db, connIdentity) {
        keyDB.value = db
        keyConnIdentity.value = connIdentity
    }

    function selectKeyKey(key) {
        keyKey.value = key
    }


    return {keyDB, keyConnIdentity, selectDB, selectKey, keyKey, selectKeyKey}
})
