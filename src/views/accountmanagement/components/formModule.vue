<template>
  <div>
    <el-form ref="form" :model="searchForm" class="formBox">
      <el-form-item class="formStyle">
        <el-input v-model="searchForm.keyWords" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.selectValue" class="formStyle" placeholder="请选择筛选内容">
          <div v-for="item in initData" :key="item.value">
            <el-option :label="item.key" :value="item.value"></el-option>
          </div>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        keyWords: '',
        selectValue: ''
      },
      initData: [
        {
          key: '选项1',
          value: '0'
        },
        {
          key: '选项2',
          value: '1'
        },
        {
          key: '选项3',
          value: '2'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.formBox {
  display: flex;
  justify-content: flex-end;
}
.formStyle {
  width: 250px;
  margin-left: 20px;
}
</style>
