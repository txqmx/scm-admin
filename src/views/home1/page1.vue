<template>
  <div>
    <mc-search inputWidth="200px" labelWidth="70px" :searchData="searchData" @search="clickSearch">
      <mc-select label="仓库" v-model="searchData.globalWareId" :options="globalWareList" required prop="globalWareId"></mc-select>
      <mc-input label="sku id" v-model="searchData.skuId" dataType="int" required prop="skuId"></mc-input>
    </mc-search>
    <mc-table :total="total" :offset.sync="page.offset" :limit.sync="page.limit" @getTableData="getTableList">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column prop="skuId" label="SKUID"></el-table-column>
        <el-table-column prop="skuName" label="商品名称" width="350px"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <mc-delbtn @delete="deleteItem(scope.row)" msg="确认删除该项配置吗">删除</mc-delbtn>
          </template>
        </el-table-column>
      </el-table>
    </mc-table>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'page1',
  data () {
    return {
      searchData: {
        globalWareId: '',
        skuId: ''
      },
      globalWareList: [],
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
      this.tableLoading = false
    },
    deleteItem (row) {}
  }
}
</script>

<style scoped>

</style>
