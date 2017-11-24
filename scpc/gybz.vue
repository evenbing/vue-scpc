<template>
  <div class="fluid container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div  class="col-md-3">
        <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
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
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div  class="col-md-3">
        <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in list2" :key="element.order">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li>
          </transition-group>
        </draggable>
      </div>
    </el-card>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]

  export default {
    name: 'hello',
    components: {
      draggable,
    },
    data () {
      return {
        list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
        list2:[],
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
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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
    watch: {
      isDragging (newValue) {
        if (newValue){
          this.delayedDragging= true
          return
        }
        this.$nextTick( () =>{
          this.delayedDragging =false
        })
      }
    }
  }
</script>

<style>
  .container{
    display: flex;
  }
  .box-card{
    flex:0.5;
  }
  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i{
    cursor: pointer;
  }
</style>
