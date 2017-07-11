
import Home from '@/components/index'
import Main from '@/components/main'
import Login from '@/components/login'
import notFound from '@/components/notFound'
import resList from '@/components/resmgr/resList'
import resAdd from '@/components/resmgr/resAdd'
import jyryjy from '@/components/scglxt/zlgl/jyryjy'
import htgl from '@/components/scglxt/xsgl/htManager'
import gjk from '@/components/scglxt/kcgl/gjkManager'
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
        { path: '/ddcggl', component: htgl, name: '订单采购管理' ,meta:{'tableId':'010402'}},
        { path: '/resAdd',hidden: true, component: resAdd, name: '新增' ,meta:{'tableId':'0101'}}
      ]
    },{
      path: '/index',
      component: Home,
      name: '销售管理',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/gjk', component: gjk, name: '工具库管理' ,meta:{'tableId':'0111'}},
        { path: '/htgl', component: htgl, name: '合同管理' ,meta:{'tableId':'0101'}},
      ]
    },{
    path: '/index',
    component: Home,
    name: '生产管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      { path: '/jgryjg', component: gjk, name: '工具库管理' ,meta:{'tableId':'0111'}},
      { path: '/scqkgz', component: htgl, name: '合同管理' ,meta:{'tableId':'0101'}},
    ]
  },{path: '*',  component: Home}
];

export default routes;

