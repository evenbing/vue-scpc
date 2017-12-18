<template>
  <div class="fluid container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工艺工序</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div  class="col-md-3">
        <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <!--<i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>-->
              <el-checkbox @click="element.fixed=! element.fixed" class="el-transfer-panel__item" :label="element.name"  :key="element.order"></el-checkbox>
              <!--<el-badge :value="element.order" class="list-group-item__badge"></el-badge>-->
            </li>

          </transition-group>
        </draggable>
      </div>
    </el-card>
    <div class="el-transfer__buttons">
      <el-button  type="primary"  size="small"  @click.native="addToLeft"  :disabled="list.length === 0">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button type="primary" size="small"  @click.native="addToRight" :disabled="list2.length === 0">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工艺卡编制</span>
        <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
      </div>
      <div  class="col-md-3">
        <el-table :data="list2" height="250" border style="width: 100%">
          <el-table-column type="index"  width="70">
          </el-table-column>
          <el-table-column  prop="name"  label="工序" width="100">
          </el-table-column>
          <el-table-column prop="selectSblx" label="设备类型"  width="120">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.selectSblx">
              <el-radio :label="sblx.id"  :name="scope.row.id" :key="sblx.id" change="radioHandler(scope.row,sblx.id)"  v-for="sblx in scope.row.sblx">{{sblx.name}}</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="额定工时" width="110">
            <template slot-scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="order" label="总工时" width="110">
            <template slot-scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="address" label="工艺内容" width="300">
            <template slot-scope="scope">
              <el-input type="textarea"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in list2" :key="element.order">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              <!--<el-checkbox @click="element.fixed=! element.fixed" class="el-transfer-panel__item" :label="element.name"  :key="element.serial"></el-checkbox>-->
              <!--<el-badge :value="element.serial" class="list-group-item__badge"></el-badge>-->

            </li>
          </transition-group>
        </draggable>
      </div>
    </el-card>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio10" size="mini">
        <el-radio label="1" border>备选项1</el-radio>
        <el-radio label="2" border>备选项2</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'hello',
    components: {
      draggable,
    },
    data () {
      return {
        message : [],
        list: [],
        list2:[],
        radio:[],
        radio10:'1',
        editable:true,
        isDragging: false,
        delayedDragging:false
      }
    },
    methods:{
      orderList () {
        this.list = this.list.sort((one,two) =>{return one.order-two.order; })
      },
      onMove ({relatedContext, draggedContext}) {
        let newElement = draggedContext.element;
        newElement.serial = this.list2.length + 1
        var params = new URLSearchParams();
        params.append("gyid", draggedContext.element.id);

        this.func.ajaxPost(this.api.getGySblxData,params, res => {

            newElement.sblx = res.data
            newElement.selectSblx = res.data[0].id

        });
        console.log(newElement)

        const relatedElement = relatedContext.element;
        const draggedElement = newElement;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      radioHandler(rowData,radioIndex){
        console.log(rowData);
        console.log(radioIndex+"===")
      }
    },
    computed: {
      dragOptions () {
        return  {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      }
    },
    mounted(){
      this.func.ajaxPost(this.api.getGyGxData,{}, res => {
        this.message = res.data;
      });
    },
    watch: {
      isDragging (newValue) {
        if (newValue){
          this.delayedDragging= true
          return
        }
        this.$nextTick( () =>{
          this.delayedDragging =false
        })
      },
      message:function(val){
        this.list = val.map( (item,index) => {
          let name = item.name
          let id = item.id
          return {
            name,
            id,
            order: index+1,
            fixed: false
          }
        })
      },
      list2:function (val) {
//        this.list2.map( (item,index) => {
//          let name = item.fzbz
//          let id = item.id
//          let indexValue = index + 1
//          return {
//            name,
//            id,
//            serial: indexValue,
//            fixed: false
//          }
//        })
      },
      list:function (val) {
        if(val.length<this.message.length){
          this.list = this.message.map( (item,index) => {
            let name = item.name
            let id = item.id
            return {
              name,
              id,
              order: index+1,
              fixed: false
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    display: flex;
  }
  .box-card{
    //flex:0.5;
   // width: 300px;
  }
  .list-group {
    border:0.5px solid lavender;
    padding:10px;
    overflow-y: scroll;
    max-height: 300px;
    min-height: 100px;
  }

  .list-group-item {
    background: rgba(9, 16, 27, 0.03);
    cursor: move;
    display: flex;
    padding:0 15px;
    margin:5px 5px;
    line-height: 40px;
    list-style: none;
    .el-transfer-panel__item{
      flex:0.9;
    }
    .list-group-item__badge{
      flex:0.1;
    }
  }

  .list-group-item i{
    cursor: pointer;
  }
  .el-radio+.el-radio {
    margin-left: 0;
  }
</style>
