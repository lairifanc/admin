// 轮播图api
import axios from '../utils/index'

class Slide{
    // 轮播图查询接口
    list(page,show){
        let url = `/axios/slideshow/find?show=${show}&page=${page}`
        return axios.get(url)
    }
    // 轮播图删除接口
    del(_id){
        let url = `/axios/slideshow/del?id=${_id}`
        return axios.delete(url)
    }
    // 轮播图添加接口
    add(payload){
        let url = '/axios/slideshow/add'
        return axios.post(url, payload)
    }
    // 轮播图修改接口
    update(_id,payload) {
      let url = `/axios/slideshow/updata?id=${_id}`
      return axios.put(url,payload)
    }
    // 查询一条数据
    findone(_id){
        let url = `/axios/slideshow/findOne?id=${_id}`
        return axios.get(url,_id)
    }
    
}

export default new Slide()