<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-if="$hasPermission('xx')"
        size="small"
        type="primary"
        @click="showAddOrEditDialog('add')"
      >新增商品</el-button>
      <el-button size="small" type="primary" :disabled="btnDisabled" @click="showComfirm()">批量删除</el-button>
      <!-- <search-bar :search-key="searchKey" @handle-search="handleSearch" class="local_searchBar"></search-bar> -->
    </div>
    <div class="table_container">
      <el-table
        :data="list"
        v-loading.body="listLoading"
        @selection-change="handleSelectionChange"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
      >
        <template v-for="(item, index) in keys">
          <el-table-column v-if="item.key === 'action'" :label="item.label" :key="index">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="checkDetail(scope.$index, scope.row)"
                class="spanStyle"
              >查看</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                class="spanStyle"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                class="spanStyle"
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item.key"
            :label="item.label"
            :type="item.type"
            :key="index"
            :column-key="item.key"
          ></el-table-column>
        </template>
      </el-table>
    </div>
    <el-row class="pagination-container" type="flex">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
    <!-- 新增和编辑模态框 -->
    <el-dialog
      :title="addEditDialogType | MY_ARE"
      @close="dialogClose"
      :visible.sync="addEditDialogVisible"
      width="500px"
    >
      <el-form
        ref="mainForm"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="120px"
      >
        <el-form-item prop="localName" label="使用地理位置名称">
          <el-input v-model="form.localName"></el-input>
        </el-form-item>
        <el-form-item prop="pics" label="商品图片">
          <!-- todo -->
          <el-upload
            action="/sm/web/sm/goodsSku/uploadShopPics"
            name="pics"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="handleBeforeUpload"
            :limit="5"
          >
            <i id="innerIcon" class="el-icon-plus"></i>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/jpeg/png/bmp文件，且不超过20MB，建议上传图片宽高比例为1:1且不低于640*640像素</div>
          </el-upload>
          <el-dialog :visible.sync="previewVisible" append-to-body center>
            <img
              :src="dialogImageUrl"
              alt
              class="imgBigger"
              style="max-width:100%;object-fit:none;object-position:100% 100%;"
            />
          </el-dialog>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddOrEditConfirm" type="primary">确定</el-button>
        <el-button @click="addEditDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!--详情  -->
    <el-dialog title="详情" :visible.sync="detailDialogVisible" width="500px">
      <el-row>
        <el-col :span="8" class="textAlignRight">使用地理位置编号：</el-col>
        <el-col :span="16">{{detailObject.localNo || '-'}}</el-col>
      </el-row>
      <el-row class="mt-20">
        <el-col :span="8" class="textAlignRight">使用地理位置名称：</el-col>
        <el-col :span="16">{{detailObject.localName || '-'}}</el-col>
      </el-row>
      <el-row class="mt-20">
        <el-col :span="8" class="textAlignRight">发布人：</el-col>
        <el-col :span="16">{{detailObject.employeeName || '-'}}</el-col>
      </el-row>
      <el-row class="mt-20">
        <el-col :span="8" class="textAlignRight">发布时间：</el-col>
        <el-col :span="16">{{detailObject.createTime || '-'}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import searchBar from '@/components/SearchBar'
import {
  getCapitalAssertsLocalsForPage,
  insertCapitalAssertsLocal,
  updateCapitalAssertsLocalById,
  deleteCapitalAssertsLocalBatch
} from '@/assets/api/test/test'
import _ from 'lodash'
// import { keys } from './table_config'
// import { requireInput } from '@/utils/validateForm'

const fakeData = [
  {
    localNo: '哈哈哈'
  }
]
export default {
  components: {
    // searchBar
  },

  data() {
    return {
      searchKey: '请输入商品名称',
      // keys: keys,
      searchObj: {
        employeeName: '',
        endTime: '',
        startTime: '',
        status: '',
        taskTypeId: ''
      },
      list: fakeData,
      addEditDialogType: '',
      detailDialogVisible: false,
      addEditDialogVisible: false,
      form: {
        localName: '',
        pics: ''
      },
      localId: '',
      detailObject: {},
      btnDisabled: true,

      dialogImageUrl: '',
      previewVisible: false,

      listLoading: false,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pageSizes: [10, 50, 100]
    }
  },
  computed: {
    keys() {
      return [
        {
          type: 'selection'
        },
        {
          key: 'localNo',
          label: '使用地理位置编号'
        },
        {
          key: 'localName',
          label: '使用地理位置名称'
        },
        {
          key: 'employeeName',
          label: '发布人'
        },
        {
          key: 'createTime',
          label: '发布时间'
        },
        {
          key: 'action',
          label: '操作'
        }
      ]
    },
    rules() {
      return {
        // localName: requireInput('请输入使用地位置名称', 'change')
      }
    }
  },
  created() {
    // this.setTable()
  },
  methods: {
    // 从数组对象中获取与key相同的lable
    getCodeName(list, key) {
      var name = ''
      for (let n in list) {
        if (list[n].value === key) {
          name = list[n].label
        }
      }
      return name
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.setTable()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.setTable()
    },

    handleSelectionChange(val) {
      this.selectedList = val.map(res => res.localId)
      this.btnDisabled = this.selectedList.length < 1
    },

    handleRemove(file, fileList) {
      this.setPics(fileList)
    },

    handleImgSuccess(response, file, fileList) {
      this.setPics(fileList)
    },

    handleBeforeUpload(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      if (!isJPG && !isJPEG && !isPNG && !isBMP) {
        this.$message.error('上传图片只能是 jpg/jpeg/png/bmp 格式!')
        return false
      }
      if (file.size / 1024 / 1024 > 20) {
        this.$message.error('上传图片不能大于20M')
        return false
      }
      if (file.name.length > 120) {
        this.$message.error('图片名称不能超过120个字符')
        return false
      }
    },

    setPics(fileList) {
      this.form.pics = fileList.map(v => {
        if (v.response) {
          // 区分编辑时候的图片数据来源
          return _.pick(v.response.data[0], ['id', 'name', 'url'])
        } else {
          return v
        }
      })
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.previewVisible = true
    },

    handleSearch(val) {
      this.searchObj = _.merge(this.searchObj, val)
      this.currentPage = 1
      this.setTable(this.searchObj)
    },

    showAddOrEditDialog(type) {
      this.addEditDialogType = type
      this.addEditDialogVisible = true
      switch (this.addEditDialogType) {
        case 'add':
          break
        case 'edit':
          this.form.name = 'xxxx'
          break
      }
    },

    checkDetail(index, row) {
      this.detailDialogVisible = true
    },

    handleEdit(index, row) {
      this.showAddOrEditDialog('edit')
    },

    handleDelete(index, row) {
      this.showComfirm(row.skuId)
    },

    showComfirm(id = null) {
      if (id) {
        this.selectedList = [id]
      }
      this.$deleteConfirm(this.deleteData)
    },

    // 确认按钮事件
    handleAddOrEditConfirm() {
      this.$refs.mainForm.validate(valid => {
        if (valid) {
          if (this.addEditDialogType === 'add') {
            this.addData(this.form)
          }
          if (this.addEditDialogType === 'edit') {
            this.editData(this.form)
          }
        } else {
          return false
        }
      })
    },

    dialogClose() {
      this.addEditDialogVisible = false
      this.$nextTick(() => {
        this.initFormFields()
        this.$refs.mainForm.resetFields()
      })
    },

    initFormFields() {
      this.form = {
        localName: ''
      }
    },

    // 列表数据
    async setTable(queryParams = {}) {
      await getCapitalAssertsLocalsForPage(
        {
          page: this.currentPage,
          pageSize: this.pageSize
        },
        {
          ...queryParams
        }
      ).then(res => {
        for (let i = 0; i < 50; i++) {
          this.list.push(res.data.rows)
        }
        // this.list = res.data.rows
        this.list.unshift({
          localNo: '哈哈哈'
        })
        this.total = res.data.total
      })
    },

    // 新增
    async addData(insertData = {}) {
      await insertCapitalAssertsLocal({
        ...insertData
      }).then(() => {
        this.addEditDialogVisible = false
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.currentPage = 1
        this.setTable()
      })
    },

    // 编辑
    async editData(updateData = {}) {
      await updateCapitalAssertsLocalById({
        ...updateData,
        localId: this.localId
      }).then(() => {
        this.addEditDialogVisible = false
        this.detailDialogVisible = false
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.setTable()
      })
    },

    // 删除
    async deleteData() {
      await deleteCapitalAssertsLocalBatch({
        ids: this.selectedList
      }).then(() => {
        this.addEditDialogVisible = false
        this.detailDialogVisible = false
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.setTable()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
