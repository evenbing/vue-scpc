<template>
  <section>
    <el-col :span="24" style="padding-bottom: 0px;">
      <el-card  :span="24" class="box-card">
        <div slot="header" class="header">
          <span>本月统计</span>
        </div>
        <div class="text item">
             <span class="btn btn-app btn-sm btn-success no-hover">
							<span class="line-height-1 bigger-170" style="border-right: 1px solid #f4f4f4;">新增合同</span>
              <span class="line-height-1 bigger-200">{{htCount}}</span>
            </span>
            <span class="btn btn-app btn-sm btn-success no-hover">
							<span class="line-height-1 bigger-170" style="border-right: 1px solid #f4f4f4;">新增订单</span>
              <span class="line-height-1 bigger-200">{{ddCount}} </span>
            </span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="24" style="padding-bottom: 0px;">
      <el-card  :span="24" class="box-card">
        <div slot="header" class="header">
          <span>BOM状态</span>
        </div>
        <div class="text item">
        </div>
      </el-card>
    </el-col>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        htCount:0,
        ddCount:0,
        resData: []

      }
    },
    methods: {
      //获取统计本日本月新增合同和订单
      getTjData:function()
      {

        this.func.ajaxPost(this.api.getTjData,{}, res => {
            this.htCount = res.data[0].ht.length;
            this.ddCount = res.data[0].dd.length;
        });
      }
    },
    mounted() {

      this.getTjData();
    }
  }

</script>
<style>
  .header {
    font-size: 14px;
    font-weight: 900;
    line-height: 24px;
  }
  .count{
    color:red;
  }
  .tag{
    height:45px;
  }
  .item {
    padding: 18px 0;
  }
  .btn.btn-app.btn-sm {
    width: 240px;
    height:60px;
    font-size: 16px;
    border-radius: 10px;
    line-height: 60px;
  }
  .btn-app.btn-success, .btn-app.btn-success.no-hover:hover, .btn-app.btn-success.disabled:hover {
    background: #6fb3e0!important;
    background-image: -webkit-gradient(linear,left 0,left 100%,from(#6fb3e0),to(#0b9eff))!important;
    background-image: -webkit-linear-gradient(top,#6fb3e0,0%,#0b9eff,100%)!important;
    background-image: -moz-linear-gradient(top,#6fb3e0 0,#0b9eff 100%)!important;
    background-image: linear-gradient(to bottom,#0b9eff 0,#6fb3e0 100%)!important;
    background-repeat: repeat-x!important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff8ebf60',endColorstr='#0b9eff',GradientType=0)!important;
  }
  .btn.btn-app {
    display: inline-block;
    width: 150px;
    font-size: 18px;
    font-weight: normal;
    color: #FFF;
    text-align: center;
    text-shadow: 0 -1px -1px rgba(0,0,0,0.2)!important;
    border: 0;
    border-radius: 12px;
    padding: 12px 0 8px;
    margin: 2px;
    line-height: 1.7;
    position: relative;
  }
  .bigger-170{
    font-size: 120%;
    padding:10px;
  }
  .bigger-200{
    font-size: 200%;
    padding:40px;
  }
</style>
