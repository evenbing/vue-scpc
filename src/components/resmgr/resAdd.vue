<template>
  <el-col :span="24">
    <el-form  :inline="true"  ref="ruleForm" class="demo-form-inline" >

      <el-form-item key="resForm" v-for="row in columnData" :label="row.COLUMN_CNAME" :prop="row.COLUMN_NAME"  label-width="200px">
        <el-input  v-if="row.PROPERTY_TYPE === '1'"></el-input>
        <el-select v-if="row.PROPERTY_TYPE === '2'" v-model="value" placeholder="请选择">
          <el-option  v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-radio-group  v-if="row.PROPERTY_TYPE === '4'" >
          <el-radio label="全部"></el-radio>
          <el-radio label="部分"></el-radio>
        </el-radio-group>
        <el-date-picker v-if="row.PROPERTY_TYPE === '5'"   type="date"  :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>

</template>
<script>
  export default {
    data() {
      return {
        tableId:this.$route.meta.tableId,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        columnData:[],
        options:[]
      };
    },
    methods: {
      getConfig(){
        var params = new URLSearchParams();
        params.append("type", 'vue');
        params.append("flag", 'form');
        params.append("tableId", encodeURIComponent(this.tableId));

        this.func.ajaxPost(this.api.getResConfig,params, res => {
          this.columnData = res.data;
          this.listLoading = false;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.getConfig();
    }
  }
</script>
