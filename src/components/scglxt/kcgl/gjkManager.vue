<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>模糊查询:</el-form-item>

                <el-form-item item-width="300px">
                    <el-select v-model="filters.columns" multiple placeholder="请选择" >
                        <el-option  v-for="item in resRows"
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
                    <el-button v-on:click="getResList" type="primary"  icon="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAdd" type="primary"  icon="edit">新增</el-button>
                </el-form-item>
              <el-form-item>
                <el-button @click="handleExport" type="primary"  icon="share">导出</el-button>
              </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="resDatas"  v-loading="listLoading"  stripe border max-height="400" height="500" style="width: 100%;">
            <el-table-column type="selection" width="50px">
            </el-table-column>
            <el-table-column type="index" width="60px">
            </el-table-column>
            <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="success" size="small" icon="plus"  @click="rkClick(scope.$index, scope.row)">入库</el-button>
              <el-button type="danger" size="small" icon="minus">出库</el-button>
            </template>
            </el-table-column>
            <el-table-column v-for="row in resRows" key="resConfig" :prop="row.COLUMN_NAME" :label="row.COLUMN_CNAME" :width="row.COLUMNLENGTH?row.COLUMNLENGTH+'px':'150px'" sortable>
            </el-table-column>
        </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
      <!--入库单-->
      <el-dialog  size="tiny" title="入库单" v-model="isRkShow" :visible.sync="isRkShow">
        <el-form :model="rkForm" label-width="80px">

            <div>入库工具名称:{{rkForm.rkgjMc}}</div>
            <div>入库工具型号:{{rkForm.rkgjxh}}</div>
            <el-form-item label="入库数量" prop="rkCount">
            <el-input v-model="rkForm.rkCount" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
          <el-button @click.native="isRkShow = false">取消</el-button>
        </div>
      </el-dialog>
    </section>

</template>

<script>

    export default{
        data(){
            return{
                filters: {
                    columns:[],
                    name:''
                },
                tableId: this.$route.meta.tableId,
                resRows:[],
                resDatas: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                isRkShow:false,
                rkForm:{
                  rkgjMc:'',
                  rkgjxh:'',
                  rkCount:0
                }
            }
        },
        methods:{
            //获取表格配置信息
            getConfig(){
              var params = new URLSearchParams();
              params.append("type", 'vue');
              params.append("flag", 'list');
              params.append("tableId", encodeURIComponent(this.tableId));

              index.vue
            },
          //获取表格数据
            getResList(){
              var params = new URLSearchParams();
              params.append("type", 'vue');
              params.append("tableId", encodeURIComponent(this.tableId));

              if(this.filters.name!=""){
                params.append("querytype","1");
                params.append("queryColumn",this.filters.columns);
                params.append("queryKey",this.filters.name);
              }
                this.func.ajaxPost(this.api.getResList,params, res => {
                  this.resDatas = res.data.data;
                  this.total=res.data.data.length;
                  this.listLoading = false;
              });
            },
          //导出
          handleExport(){
              window.location.href=this.api.exportData+'?tableId='+this.tableId;
          },
            //新增按钮
            handleAdd(){

              this.$router.push({path:'/resAdd'});
            },
            handleCurrentChange(val) {
              this.page = val;
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
            },
            //点击某行入库时执行
            rkClick(index,row){
              this.isRkShow = true;
              this.rkForm.rkgjMc="懂得多";
              console.log(row.mc)
              //this.rkForm.rkgjMc=row.mc;
              this.rkForm.rkgjxh=row.cc;
              this.rkForm = Object.assign({}, row);
            }
        },
        mounted() {
            this.getConfig();
            this.getResList();
        }
    };
</script>
