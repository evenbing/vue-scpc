<template slot-scope="scope">
  <el-button v-if="!zddmc" type="success" size="small" @click="handleExportBlData(scope.row.id)">
    导出备料单
  </el-button>
        <span v-if="zddmc">
         <el-radio-group  v-model="clzt">
           <el-radio value="1"  name="radio_blqk" v-model="blqk" class="radio" @click="updateClzt(scope.row.id)" label="完成"></el-radio>
            <span v-if="clzt==='0'">
              <el-tag type="primary">待采购</el-tag>
            </span>
              <span v-else-if="clzt==='2'">
              <el-tag type="success">自备料</el-tag>
            </span>
           <el-radio  v-else value="0" v-model="blqk" v-on:click="updateClzt(scope.row.id)" name="radio_blqk" class="radio" label="待采购"></el-radio>
           <el-radio  v-else value="2" v-model="blqk" v-on:click="updateClzt(scope.row.id)" name="radio_blqk" class="radio" label="自备料"></el-radio>
         </el-radio-group>
        </span>
</template>
<script>
  export default {
    name: 'blqkButton',
    props: {
      bomId: {//bomId用来执行按钮时传参
        type: String
      },
      zddmc:{
        type:String
      },
      clzt: {//材料状态不同显示不同按钮
        type: String,
        default: function () {
          return '0'
        }
      }
    },
    components:{

    }
  }
</script>
