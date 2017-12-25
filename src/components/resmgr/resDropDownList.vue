<template>
  <el-select @change="selectValue" filterable placeholder="请选择">
    <el-option  v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    name: 'dropDownList',
    props: {
      tableId: {
        type: String
      },
      column: {
        type: String
      }
    },
    data(){
      return {
        options: []
      }
    },
    methods:{
      getListData(){
        var params = new URLSearchParams();
        params.append("columnName",  encodeURIComponent(this.column));
        params.append("tableId", encodeURIComponent(this.tableId));

        this.func.ajaxPost(this.api.getComboboxData,params, res => {

          if (res.data.length > 0) {
              this.options = res.data
            }
        })
      },
      selectValue(item){
        this.$emit('selectItem', {key: this.column,value: item})
      }
    },
    mounted(){
      this.getListData()
    }
  }
</script>
