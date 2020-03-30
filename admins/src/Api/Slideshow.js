// 轮播图api
import axios from '../utils/index'

class Slide{
    // 轮播图查询接口
    list(){
        let url = '/axios/slideshow/find'
        return axios.get(url)
    }
    // 轮播图删除接口
    del(_id){
        let url = `/axios/slideshow/del?id=${_id}`
        return axios.delete(url)
    }
}

export default new Slide()