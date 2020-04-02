import axios from '../utils/index' 
class Api {
    del(_id){
    let url =`/axios/audit/del?id=${_id}`
    return axios.delete(url)
    }

    list(show,page){
        let url =`/axios/audit/find?show=${show}&page=${page}`
        return axios.get(url) 
    }
    add(payload){
        let url ='/axios/audit/add'
        return axios.post(url,payload) 
    }
    findOne(_id){
        let url =`/axios/audit/findOne?id=${_id}`
        return axios.get(url) 
    }
    upDate(_id,payload){
        let url =`/axios/audit/updata?id=${_id}`
        return axios.put(url,payload) 
    }
}
// 抛出
export default new Api()