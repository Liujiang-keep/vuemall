import axios from 'axios'

export function request(options) {
  return new Promise((resolve,reject)=>{
    //创建axios实例对象
    const instance = axios.create({
      baseURL:'http://152.136.185.210:8000/api/n3',
      timeout:5000
    })
    //过滤器（拦截器）
    instance.interceptors.response.use(res =>{
      return res.data
    })
    //通过实例发送网络请求
    instance(options).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
    })
  })
}