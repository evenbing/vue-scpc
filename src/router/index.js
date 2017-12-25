
import Home from '@/components/index'
import Main from '@/components/main'
import Login from '@/components/login'
import Test from '@/components/scpc/gybz'
import notFound from '@/components/notFound'
import resView from '@/view/resmgr/resView'
import resAdd from '@/components/resmgr/resAdd'
import gybz from '@/components/scpc/gybz'
import jyryjy from '@/view/scglxt/zlgl/jyryjy'
import htgl from '@/view/scglxt/xsgl/htManager'
import gjk from '@/view/scglxt/kcgl/gjkManager'
import blkcgl from '@/view/scglxt/kcgl/blkcglManager'
import jgryjg from '@/view/scglxt/scgl/jgryjg'

let routes = [

  {
    path: '/',
    component: Home,
    name: '技术管理',
    iconCls: 'el-icon-date', // 图标样式class
    children: [
        { path: '', component: resView, name: ''},
        { path: '/main', component: Main, name: '信息总览'},
        { path: '/resview/:tableId', hidden: true, component: resView, name: '数据列表'},
        { path: '/resAdd', hidden: true, component: resAdd, name: '新增'}
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true
  },
  {path: '/404', component: notFound},
  {path: '/test', component: Test},
  {path: '*', component: Home}
]

export default routes
