<template>
  <div>
    <mc-search inputWidth="250px" labelWidth="70px" :searchData="searchData" @search="clickSearch">
      <mc-date-picker
        label="创建日期"
        v-model="searchData.date"
        value-format="timestamp"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </mc-date-picker>
      <mc-input label="创建人" v-model="searchData.createUser"></mc-input>
      <mc-input label="sku id" v-model="searchData.skuId" dataType="int"></mc-input>
      <mc-select label="仓库" v-model="searchData.globalWareId" :options="globalWareList"></mc-select>
      <mc-select label="状态" v-model="searchData.status" :options="statusList"></mc-select>
      <template v-slot:button>
        <el-button size="mini" type="primary" @click="addDialog = true">添加</el-button>
      </template>
    </mc-search>
    <mc-table :total="total" :offset.sync="page.offset" :limit.sync="page.limit" @getTableData="getTableList">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column prop="skuId" label="SKUID"></el-table-column>
        <el-table-column prop="skuName" label="商品名称"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="applyUser" label="申请人"></el-table-column>
        <el-table-column prop="expireTimeStr" label="失效日期"></el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <mc-delbtn @delete="deleteItem(scope.row)" msg="确认解除该条配置吗">删除</mc-delbtn>
          </template>
        </el-table-column>
      </el-table>
    </mc-table>
    <!--配置-->
    <mc-dialog title="配置" :view.sync="addDialog" @submit="submit" clearForm width="35%">
      <div>配置化表单传入required，所有项都是必填,某一条可以具体设置</div>
      <mc-form
        ref="addForm"
        :formData="addFormData"
        :formDesc="formDesc"
        label-width="90px"
        input-width="200px"
        required
      >
        <template v-slot:applyUser>
          <el-input v-model="addFormData.applyUser" size="mini" placeholder="template中自定义写法"></el-input>
        </template>
      </mc-form>
    </mc-dialog>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'page2',
  data () {
    return {
      searchData: {
        date: '',
        skuId: '',
        globalWareId: '',
        status: '',
        createUser: ''
      },
      globalWareList: [], // 仓库列表
      statusList: [
        { name: '生效', id: 1 },
        { name: '失效', id: 0 }
      ],
      addFormData: {
        skuId: '',
        globalWareIdList: [],
        expireTimeStr: '',
        applyUser: '',
        applyUser2: ''
      },
      class2List: [],
      isAllClass: false,
      formDesc: {
        skuId: {
          label: 'skuId',
          type: 'mc-input',
          attrs: {
            dataType: 'int',
            placeholder: '二次封装写法'
          }
        },
        globalWareIdList: {
          label: '仓库',
          type: 'mc-select',
          attrs: {
            multiple: true,
            collapseTags: true
          },
          on: {
            change: this.globalWareChange
          },
          options: data => this.globalWareList
        },
        expireTimeStr: {
          label: '失效日期',
          type: 'mc-date-picker',
          attrs: { // 二次封装，属性透传
            'value-format': 'yyyy-MM-dd'
          }
        },
        applyUser2: {
          label: '申请人2',
          type: 'el-input', // 直接使用ele
          attrs: {
            'size': 'mini',
            'placeholder': '配置项传入el-input写法'
          },
          rules: { required: false }
        },
        applyUser: { // slot名称
          label: '申请人',
          type: 'el-input',
          slot: true, // 自定义写法
          rules: { required: false }
        }
      },
      addDialog: false,
      page: {
        offset: 0,
        limit: 20
      },
      total: 0,
      tableData: [{}],
      tableLoading: false
    }
  },
  methods: {
    // 查询
    clickSearch () {
      this.page.offset = 0
      this.getTableList()
    },
    // 获取表格数据
    getTableList () {
      this.tableLoading = true
      let param = Object.assign({}, this.searchData, this.page)
      param.gteCreateTime = param.date ? param.date[0] / 1000 : ''
      param.lteCreateTime = param.date ? param.date[1] / 1000 : ''
      this.tableLoading = false
    },
    // 添加
    submit () {
      this.$refs['addForm'].submit().then(res => {
        let param = Object.assign({}, this.addFormData)
      })
    },
    // 删除某一条
    deleteItem (row) {
    },
    // chang事件
    globalWareChange () {
    }
  }
}
</script>

<style scoped>

</style>
