<template>

  <div class="index-section">
    <div class="index-header is-fixed">
      <el-col :span="8" class="logo">
        <img src="../../static/logo.png">{{collapsed ? '' : sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="el-icon-view"></i>
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
    </div>
    <div class="index-main">
      <div ref="mainLeft" class="main_left">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
          <!--导航菜单-->
          <el-menu :default-active="menuData" :default-openeds ="defaultOpenMenu" unique-opened v-show="!collapsed" background-color="#eef1f6">
            <template v-for="(item,index) in menuData" v-if="!item.hidden">
              <el-submenu :index="item.id" :key="index" v-if="!item.isyz==0">
                <template slot="title"><i :class="item.cdtb"></i>{{item.cdmc}}</template>
                <el-menu-item v-for="child in item.children" @click="menuItemClick" :value="child.cdmc"
                              :index="child.id" :key="child.cddz" :route="child.table_id" v-if="!child.hidden">
                  {{child.cdmc}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
          <!--导航菜单-折叠后-->
        </aside>
      </div>
      <div ref="mainContent" class="main_content">
        <el-col :span="24" class="breadcrumb-container">
          <el-breadcrumb separator="/" class="breadcrumb-container">

            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              <i class="el-icon-caret-right"></i>{{ item.name }}
            </el-breadcrumb-item>

          </el-breadcrumb>
        </el-col>
        <router-view></router-view>
      </div>
    </div>
  </div>
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
        defaultOpenMenu:['1001'],
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

      var offsetHeight = window.innerHeight
      this.$refs.mainLeft.style.height = (offsetHeight - 60) + 'px'
      this.$refs.mainContent.style.height = (offsetHeight - 60) + 'px'
    }
  }

</script>
<style lang="scss" scoped>

  .is-fixed {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 99;
  }

  .index-section {
    height: 100%;
    .index-header {
      height: 60px;
      line-height: 60px;
      background: #20a0ff;
      color: #fff;
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
    }
    .index-main {
      padding-top: 60px;
      display: flex;
      overflow: hidden;
      position: relative;
      .main_left {
        width: 20%;
        height: 700px;
        background: #eef1f6;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        transition: 0.2s;
      }
      .main_content {
        flex: 1;
        padding: 10px;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        height: 700px;
        .breadcrumb-container {
          margin: 5px auto;
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
      }
    }

    .header-in {
      font-size: 16px;
      margin-left: 10px;
    }
  }
</style>
