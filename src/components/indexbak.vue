<template>
  <el-row ref="container" class="container">
    <el-col :span="24" class="header">
      <el-col :span="8" class="logo">
        <img src="../../static/logo.png">{{collapsed ? '' : sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar"/> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown" split-button="true">
            <el-dropdown-item>我的信息</el-dropdown-item>
            <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="menuData"  unique-opened v-show="!collapsed" background-color="#eef1f6">
          <template v-for="(item,index) in menuData" v-if="!item.hidden">
            <el-submenu :index="index" v-if="!item.isyz==0">
              <template slot="title"><i :class="item.cdtb"></i>{{item.cdmc}}</template>
              <el-menu-item v-for="child in item.children" @click="menuItemClick" :value="child.cdmc"
                            :index="child.cddz" :key="child.cddz" :route="child.table_id" v-if="!child.hidden">
                {{child.cdmc}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->

      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-container">

              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                <i class="el-icon-caret-right"></i>{{ item.name }}
              </el-breadcrumb-item>

            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
        <el-dialog title="修改密码" size="tiny" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="原密码" label-width="80px">
              <el-input v-model="form.oldpwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="80px">
              <el-input v-model="form.newpwd" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </section>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data () {
      return {
        // sysName:'兴隆模具生产管理系统',
        sysName: '111',
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '',
        dialogFormVisible: false,
        selectMenu: {
          parentName: '技术管理',
          name: '订单管理'
        },
        menuData: [],
        form: {
          oldpwd: '',
          newpwd: '',
          new2pwd: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      showMenu (i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
      },
      //动态加载菜单
      loadMenu (ssbz) {
        var params = new URLSearchParams()
        params.append('vue', 'vue')
        params.append('ssbz', ssbz)
        this.func.ajaxPost(this.api.getMenu, params, res => {
          this.menuData = res.data
        })
      },
      //退出登录
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/')
        }).catch(() => {

        })
      },
      menuItemClick (item) {
        if (item.route != undefined && item.route != null) {
          this.$router.push({path: '/resview/' + item.route})
        } else {
          this.$router.push({path: '/' + item.index})
        }
      }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.sysUserName = decodeURIComponent(user.name) || ''
        this.sysUserAvatar = user.avatar || ''
        this.loadMenu(user.bzid)
      }
//      var offsetHeight = window.innerHeight
//      this.$refs.container.style.height = (offsetHeight - 60) + 'px'
    }
  }

</script>

<style lang="scss" scoped>
  .heng_menu {
    background: #20a0ff;
    color: #fff;
  }

  .container {
    top: 0px;
    bottom: 0px;
    height: 900px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #20a0ff;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 60px;
        font-size: 30px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      top: 60px;
      bottom: 0px;
      overflow: scroll;
      aside {
        flex: 0 0 230px;
        width: 230px;
        .el-menu {
          height: 100%;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            height: auto;
            display: none;
          }

        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        flex: 1;
        width: 100%;
        overflow: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            font-size: 14px;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          margin-top: 15px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
