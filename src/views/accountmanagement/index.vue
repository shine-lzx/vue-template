<template>
  <div class="global_container">
    <div>
      <searchBar />
    </div>
    <el-table :data="list" border>
      <template v-for="(item, index) in keys">
        <el-table-column
          :prop="item.key"
          :label="item.label"
          :type="item.type"
          :key="index"
          :column-key="item.key"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import searchBar from './components/formModule'
import { keys } from './key.js'
export default {
  components: {
    searchBar
  },
  data() {
    return {
      list: [
        {
          workId: 20,
          firstStatus: 10,
          workNo: 1,
          distance: 3,
          providerMoney: 66,
          status: 999,
          reason6: 2333,
          reason0: 2333,
          reason1: 2333,
          reason: 2333
        }
      ],
      keys: keys
    }
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
