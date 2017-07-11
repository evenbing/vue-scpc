import axios from "axios";

var instance = axios.create({
  //baseURL: 'http://192.168.0.141/scpc';  //接口基本地址
  timeout: 10000,
  responseType:'json',
  withCredentials:true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});

export default {
    ajaxGet (api, cb) {
        axios.get(api)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
    ajaxPost (api, post, cb) {
        axios.post(api, post)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
}
