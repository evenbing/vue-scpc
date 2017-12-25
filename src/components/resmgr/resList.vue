<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>模糊查询:</el-form-item>

        <el-form-item item-width="300px">
          <el-select v-model="selColumns" multiple placeholder="请选择" >
            <el-option v-for="item in resRows" :key="item.COLUMN_NAME" :label="item.COLUMN_CNAME"  :value="item.COLUMN_NAME">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getResList" type="primary"  size="small" icon="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleAdd" type="primary"  size="small" icon="edit">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleExport" type="primary"  size="small" icon="share">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="resDatas"  v-loading="listLoading"  header-cell-class-name="table_th"  stripe border :max-height="tableHeight" style="width: 100%;">
      <el-table-column fixed type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column fixed type="index"  width="50" align="center">
      </el-table-column>
      <el-table-column fixed label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small" >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-for="(row,index) in resRows" key="resConfig" :prop="row.COLUMN_NAME"
      :fixed="row.IS_FROZEN == 1" :label="row.COLUMN_CNAME" :min-width="(row.COLUMNLENGTH != '')?row.COLUMNLENGTH:150" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination background style="float: right" @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="pageNumber"
        :page-sizes="[30, 60, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>

  export default{
    name:'resList',
    props:{
      tableId:{
        type:String
      }
    },
    data(){
      return{
        filters: {
          columns:'',
          name:''
        },
        resRows:[],
        resDatas: [],
        total: 0,
        pageNumber: 1,
        pageSize: 30,
        listLoading: false,
        sels: [],//列表选中列
        selColumns:[],
        tableHeight:460
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //获取表格配置信息
      getConfig(){
        var params = new URLSearchParams();
        params.append("type", 'vue');
        params.append("flag", 'list');
        params.append("tableId", encodeURIComponent(this.tableId));

        this.func.ajaxPost(this.api.getResConfig,params, res => {
          this.resRows = res.data;
          this.listLoading = false;
        });
      },
      //获取表格数据
      getResList: function () {
        var params = new URLSearchParams()
        params.append('type', 'vue')
        params.append('tableId', encodeURIComponent(this.tableId))
        params.append('pageNumber', (this.pageNumber - 1) * this.pageSize + 1)
        params.append('pageSize', this.pageSize)

        if (this.filters.name != '') {
          params.append('querytype', '1')
          params.append('queryColumn', this.selColumns)
          params.append('queryKey', this.filters.name)
        }
        this.func.ajaxPost(this.api.getResList, params, res => {
          if (res.data.data.length > 0) {
            this.resDatas = res.data.data
            this.total = parseInt(res.data.total)
            this.listLoading = false
          }
        })
      },
      //导出
      handleExport(){
        window.location.href=this.api.exportData+'?tableId='+this.tableId;
      },
      //新增按钮
      handleAdd(){
        this.$router.push({path:'/resAdd',query:{tableId:this.tableId}});
      },
      handleCurrentChange(val) {
        this.pageNumber = val;
        this.getResList();
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getConfig();
      this.getResList();
      var offsetHeight = window.innerHeight
      this.tableHeight = offsetHeight - 220
    },
    watch:{
      tableId() {
        this.getConfig();
        this.getResList();
      }
    }
  };
</script>
<style lang="scss">
  .table_th{
    text-align: center;
    border-right: 0.5px solid #cad0d7;
    background:rgba(0,27,110,0.14);
    div{
      text-align: center;
      font-weight: bold;
      color: #919cb5;
      padding: 0;
    }
  }
</style>
