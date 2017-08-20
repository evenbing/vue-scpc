// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
import func from './public/func'
import api from './api/api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
import VueResource from 'vue-resource'

//引入iview-UI的插件使用
//import iView from 'iView'
//import 'iView/dist/styles/iview.css'

Vue.config.productionTip = false


// 此处需要use后，this.$http.get或者this.$http.post才可以
Vue.use(VueRouter)
Vue.use(VueResource)
//Vue.use(iView)//更换UI插件
Vue.use(ElementUI)
Vue.use(Vuex)

//如果使用axios需要将use(vueresource)注释掉否则报错
Vue.prototype.$http = axios
Vue.prototype.axios= axios
Vue.prototype.api = api;
Vue.prototype.func = func;
Vue.prototype.$echarts = echarts;

const router = new VueRouter({
  routes
})


//路由过滤，验证是否登录
router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if(user)
  {
    //store.commit('isLogin',true);
  }
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }

  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {

    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

