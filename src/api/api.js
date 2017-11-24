'use strict';

//let host = '/api';
// let host ='http://192.168.1.254/scpc';
let host ='http://127.0.0.1:8089/scpc';

module.exports =  {
    //user
    userLogin: host + '/login.action',
    getMenu:host+'/common_loadMenuTree.action',
    //res
    getResConfig:host + '/resmgr_getTableColumns.action',
    getTreeTableData:host+'/resmgr_getTreeTableData.action',

    getResList:host + '/resmgr_queryTableData.action',

    //导出
    exportData:host+'/resmgr_exportResourceData.action',
    exportBLData:host+'/bomInfo_exportBLData.action',

    //备料情况修改
    updateBlqk:host+'/bomInfo_updateBlzk.action',
    //统计信息
    getTjData:host+'/ddInfo_getVueTjData.action',

    // 加工人员加工
    getJgryJgData:host+'/pcgl_getBomGygcJgVue.action'

};
