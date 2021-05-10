import axios from "axios"
import { message } from 'antd';
import { createHashHistory } from 'history';

const axiosInst = axios.create({
  baseURL: "http://42.193.140.83:3001",
  timeout: 10000,
});

axiosInst.interceptors.request.use(
  function(request){
    const token = localStorage.getItem("token");
    if(token){
      request.headers['Authorization'] = token;
    }
    return request;
  },
  function(error){
    console.log(error);
  }
)

axiosInst.interceptors.response.use(
  function (response) {
    const {
      meta: { code, errors },
      data,
    } = response.data;
    if (code !== 0) {
      message.info(errors[0]);
      return Promise.reject(errors);
    }
    return data;
  },
  function (error) {
    if (error.response) {
      if(error.response.status === 401){
        message.info("您尚未登录！ 请先登录！");
      }
      else if(error.response.status === 403){
        message.info("您的登录状态已过期！ 请重新登录！");
      }
    } 
    let history = createHashHistory();
    history.push("/login");
    // history.back();
    // MyHistory.push("/login");
    return Promise.reject(error);
  }
);

export default axiosInst;