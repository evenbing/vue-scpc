<template>
    <section>
      <resList></resList>
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
        name:'gjkManager',
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
            })
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
            })
            }).catch(() => {
}
              )
            },
            //点击某行入库时执行
            rkClick(index,row){
              this.isRkShow = true;
              this.rkForm.rkgjMc="懂得多";
              console.log(row.mc);
              //this.rkForm.rkgjMc=row.mc;
              this.rkForm.rkgjxh=row.cc;
              this.rkForm = Object.assign({}, row);
            }
        },
        mounted() {
            this.getConfig();
            this.getResList();
        }
    };;;
</script>
