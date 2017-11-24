
import Home from '@/components/index'
import Main from '@/components/main'
import Login from '@/components/login'
import Test from '@/components/scpc/gybz'
import notFound from '@/components/notFound'
import resList from '@/view/resmgr/resView'
import resAdd from '@/components/resmgr/resAdd'
import gybz from '@/components/scpc/gybz'
import jyryjy from '@/view/scglxt/zlgl/jyryjy'
import htgl from '@/view/scglxt/xsgl/htManager'
import gjk from '@/view/scglxt/kcgl/gjkManager'
import blkcgl from '@/view/scglxt/kcgl/blkcglManager'
import jgryjg from '@/view/scglxt/scgl/jgryjg'
import cltj from '@/view/cltj'


let routes = [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/index',
      component: Home,
      name: '技术管理',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/main', component: Main, name: '信息总览' ,meta:{'tableId':'0104'}},
        { path: '/grgstj', component: resList, name: '工人工时统计',meta:{'tableId':'0401'}},
        { path: '/cltj', component: resList, name: '材料统计',meta:{'tableId':'0402'}},
        { path: '/ddgl', component: resList, name: '订单管理' ,meta:{'tableId':'0102'}},
        { path: '/bomgl', component: resList, name: 'BOM管理' ,meta:{'tableId':'010402'}},
        { path: '/resAdd',hidden: true, component: resAdd, name: '新增' ,meta:{'tableId':'0101'}}
      ]
    },{
      path: '/index',
      component: Home,
      name: '销售管理',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/gjk', component: gjk, name: '工具库管理' ,meta:{'tableId':'0111'}},
        { path: '/htgl', component: htgl, name: '合同管理',meta:{'tableId':'0101'} },
      ]
    },{
    path: '/index',
    component: Home,
    name: '生产管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      { path: '/jgryjg', component: jgryjg, name: '加工人员加工' ,meta:{'tableId':'0111'}},
      { path: '/scqkgz', component: htgl, name: '生产情况跟踪' ,meta:{'tableId':'0101'}},
    ]
  },{
    path: '/index',
    component: Home,
    name: '库存管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      { path: '/blkcgl', component: blkcgl, name: '备料库存管理' },
    ]
  },{
    path: '/index',
    component: Home,
    name: '质量管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      { path: '/jyryjy', component: jyryjy, name: '检验人员检验',meta:{'tableId':'0101'} },
      { path: '/gybz', component: gybz, name: '工艺编制'},
    ]
  },
  {path: '/404',  component: notFound},
  {path: '*',  component: Home}
];

export default routes;
