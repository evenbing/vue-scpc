// sql语句  SQL 语句映射文件，供 API 调用
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)'
    }
}

module.exports = sqlMap;