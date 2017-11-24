<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">

    </el-col>
  <el-table :data="data"  border style="width: 100%" :row-style="showTr" height="500">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'normal'" width="160">
      <template scope="scope">
        <button type="button" class="el-button el-button--default el-button--small">
          <router-link :to="{ path: requestUrl + 'edit', query: {id: scope.row.Oid} }" tag="span">
            编辑
          </router-link>
        </button>
        <el-button size="small"  type="danger" @click="handleDelete()">
          删除
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'blkcgl'" width="270" align="center">
      <template scope="scope">
        <el-button v-if="!scope.row.zddmc" type="success" size="small" @click="handleExportBlData(scope.row.id)">
          导出备料单
        </el-button>
        <span v-if="scope.row.zddmc">
         <el-radio-group  v-model="clzt">
          <el-radio value="1"  name="radio_blqk" v-model="blqk" class="radio" @click="updateClzt(scope.row.id)" label="完成"></el-radio>
            <span v-if="scope.row.clzt==='0'">
              <el-tag type="primary">待采购</el-tag>
            </span>
              <span v-else-if="scope.row.clzt==='2'">
              <el-tag type="success">自备料</el-tag>
            </span>
            <el-radio  v-else value="0" v-model="blqk" v-on:click="updateClzt(scope.row.id)" name="radio_blqk" class="radio" label="待采购"></el-radio>
            <el-radio  v-else value="2" v-model="blqk" v-on:click="updateClzt(scope.row.id)" name="radio_blqk" class="radio" label="自备料"></el-radio>
          </el-radio-group>
        </span>
      </template>

    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="column.COLUMN_NAME" :label="column.COLUMN_CNAME" :width="180">
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.COLUMN_NAME]}}
      </template>
    </el-table-column>

  </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button @click="handleExport" type="primary"  size="small" >批量完成</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  import MSDataTransfer from '@/public/dataTranslate.js'


  //  import Vue from 'vue'
  export default {

    name: 'tree-grid',
    props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      tableId:{
          type:String,
          default:function(){
            return '0101'
          }
      },
// 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
        exportBLData:this.api.exportBLData,
        blqk:'0'
      }
    },
    computed: {
      // 格式化数据源
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
          return data
        }
        return me.dataSource
      }
    },
    methods: {
      // 显示行
      showTr: function (row, index) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      handleCurrentChange(val) {
        //this.page = val;
      },
      handleExportBlData(ddid){
        window.location.href=this.api.exportBLData+'?ddid='+ddid;
      },
      //更新材料状态
      updateClzt(id){
          console.log(id)
      },
      handleDelete () {

      }
    }
  }
</script>
<style scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
</style>
