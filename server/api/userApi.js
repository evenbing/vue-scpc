'use strict'

let func = require('../modules/func')
let sql = require('../modules/sql')

module.exports = {

    // 添加用户
  addOne (req, res) {
    let name = req.body.name
    let pass = req.body.pass
    let role = req.body.role
    let query = 'INSERT INTO user(id, name, age) VALUES(?, ?, ?)'

    func.connPool(query, arr, rows => {
      res.json({code: 200, msg: 'done'})
    })
  },

    // 登录
  login (req, res) {
    console.log('登录处理')
    let user_name = req.body.username
    let pass = req.body.password

    func.connPool('SELECT * from scglxt_t_ry where rymc = ?', [user_name], (err, rows) => {
      if (rows == null) {
        res.json({code: 400, msg: '用户名不存在'})
        return
      }

      let password = rows[0].password

      if (pass == password) {
        let user = {
          user_id: rows[0].rymc,
          user_name: rows[0].password
        }

        res.json({code: 200, msg: '登录成功', user: user})
      } else {
        res.json({code: 400, msg: '密码错误'})
      }
    })
  }

}
