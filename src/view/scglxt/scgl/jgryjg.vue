<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>模糊查询:</el-form-item>

        <el-form-item item-width="300px">
          <el-select v-model="selColumns" multiple placeholder="请选择" >
            <el-option
              v-for="item in resRows"
              :key="item.COLUMN_NAME"
              :label="item.COLUMN_CNAME"
              :value="item.COLUMN_NAME">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getResList" type="primary"  icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="resDatas"  v-loading="listLoading"  stripe border max-height="400" height="500" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index"  width="70">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small" >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-for="row in resRows" key="resConfig" :prop="row.COLUMN_NAME" :label="row.COLUMN_CNAME" :width="150" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                     :current-page="currentPage4" :page-sizes="[30, 60, 90, 150]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>

  export default{
    props:{
      tableId:{
        type:String
      },
      title:{
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
        pageSize:30,
        listLoading: false,
        sels: [],//列表选中列
        selColumns:[],
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      getResList(){
        var params = new URLSearchParams();
        params.append("type", 'vue');
        params.append("tableId", encodeURIComponent(this.tableId));

        if(this.filters.name!=""){
          params.append("querytype","1");
          params.append("queryColumn",this.selColumns);
          params.append("queryKey",this.filters.name);
          this.pageNumber = 1;
        }
        params.append("pageNumber", this.pageNumber);
        params.append("pageSize", this.pageSize);
        this.func.ajaxPost(this.api.getResList,params, res => {

          this.resDatas = res.data.data;
          this.listLoading = false;
          this.total=parseInt(res.data.total);
        });
      },

      handleCurrentChange(val) {

        this.pageNumber = (val-1)*this.pageSize;
        this.getResList();
      },
      selsChange: function (sels) {
        this.sels = sels;
      }
    },
    mounted() {
    },
    watch:{
      tableId:function () {
        this.getConfig();
        this.getResList();
      }
    }
  };
</script>
