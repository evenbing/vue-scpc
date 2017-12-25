<template>
  <el-col :span="24">
    <el-form  :inline="true"  ref="ruleForm" class="demo-form-inline" >

      <div class="form-content">
        <el-form-item key="resForm" v-for="row in columnData" :label="row.COLUMN_CNAME" :prop="row.COLUMN_NAME"  label-width="200px">
          <el-input  v-if="row.PROPERTY_TYPE === '1'" style="width: 150%;"></el-input>
          <el-select v-if="row.PROPERTY_TYPE === '2'" v-model="value" placeholder="请选择" style="width: 150%;">
            <el-option  v-for="item in options" :key="item.id" :label="item.name" :value="item.id" style="width: 150%;">
            </el-option>
          </el-select>
          <el-radio-group  v-if="row.PROPERTY_TYPE === '4'" style="width: 150%;">
            <el-radio label="全部"></el-radio>
            <el-radio label="部分"></el-radio>
          </el-radio-group>
          <el-date-picker v-if="row.PROPERTY_TYPE === '5'" type="date" :picker-options="pickerOptions0" style="width: 130%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="itemButton">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button @click="goback">取消</el-button>
        </el-form-item>he
      </div>
    </el-form>
  </el-col>

</template>
<script>
  export default {
    data() {
      return {
        tableId:this.$route.query.tableId,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        id:'',
        columnData:[],
        options:[]
      };
    },
    methods: {
      goback(){
        this.$router.back(-1)
      },
      getConfig(){
        var params = new URLSearchParams();
        params.append("type", 'vue');
        params.append("flag", 'form');
        params.append("tableId", encodeURIComponent(this.tableId));

        this.func.ajaxPost(this.api.getResConfig,params, res => {
          this.columnData = res.data.filter(item =>{
            if(item.PROPERTY_TYPE == '10'){ // 过滤掉ID字段自动处理
                this.id = item.COLUMN_NAME
            }else{
              return item
            }
          });
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
    },
    watch:{

    }
  }
</script>
