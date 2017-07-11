'use strict';

//let host = '/api';
//let host ='http://192.168.1.254/scpc';
let host ='http://192.168.0.118/scpc';
module.exports =  {
    //user
    userLogin: host + '/login.action',
    getMenu:host+'/common_loadMenuTree.action',
    //res
    getResConfig:host + '/resmgr_getTableColumns.action',
    getResList:host + '/resmgr_queryTableData.action',
    exportData:host+'/resmgr_exportResourceData.action',

    //统计信息
    getTjData:host+'/ddInfo_getVueTjData.action'
}
