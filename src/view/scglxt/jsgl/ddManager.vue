<template>
  <div class="ddgl">
      <tree-grid :columns="columns" treeType="ddgl" :tree-structure="true" :data-source="dataSource" ></tree-grid>
  </div>
</template>

<script>
  export default {
    name: 'dd',
    data () {
      return {
        tableId:'010404',
        columns: [],
        dataSource: []
      }
    },
    methods:{
      //获取表格配置信息
      getConfig(){
          var params = new URLSearchParams();
          params.append("type", 'vue');
          params.append("flag", 'list');
          params.append("tableId", encodeURIComponent(this.tableId));

          this.func.ajaxPost(this.api.getResConfig,params, res => {
            this.columns = res.data;
        });
      },
      //获取表格数据
      getResList(){
          var params = new URLSearchParams();
          params.append("type", 'vue');
          params.append("pid", 'ddid');
          params.append("tableId", encodeURIComponent(this.tableId));

          this.func.ajaxPost(this.api.getTreeTableData, params, res => {
            this.dataSource = res.data;
            this.total=res.data.length;
        })
      }
    },
    //挂载DOM完成执行
    mounted(){
      this.getConfig();
      this.getResList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
