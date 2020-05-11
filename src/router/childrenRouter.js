// 所有子组件
const AdminList = r => require.ensure([], () => r(require('@/views/main/adminList')), 'adminList')
const DataAnalysis = r => require.ensure([], () => r(require('@/views/main/dataAnalysis')), 'dataAnalysis')
const MoneyCenter = r => require.ensure([], () => r(require('@/views/main/moneyCenter')), 'moneyCenter')
const Warehouse = r => require.ensure([], () => r(require('@/views/main/warehouse')), 'warehouse')

const routes = [
  {path: '/index', redirect: 'adminList'},
  {
    path:"adminList",
    name:"AdminList",
    component:AdminList
  },
  {
    path:"dataAnalysis",
    name:"DataAnalysis",
    component:DataAnalysis
  },
  {
    path:"moneyCenter",
    name:"MoneyCenter",
    component:MoneyCenter
  },
  {
    path:"warehouse",
    name:"Warehouse",
    component:Warehouse
  },
]

export default routes
