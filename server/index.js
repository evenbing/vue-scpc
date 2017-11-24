//后台唯一入口Express 服务器入口文件
// node 后端服务器
'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./routers/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
//app.use('/api/user', userApi);

app.get('/', function (req, res) {  
  res.send('Home page');  
});  

app.use(router);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');