// 请求拦截器不需要的过滤掉

import axios from 'axios'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //在拦截器里添加请求头
    let token =localStorage.getItem('token')?'Bearer '+localStorage.getItem('token'):''      
    config.headers.authorization = token 
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  export default axios