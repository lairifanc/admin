// 统一api支援管理
import axios from '../utils/index' 


class Api {
    // 查询
    // find(show,page){
    //     let url=`/admin/goods/find?show=${show}&page=${page}`
    //     return axios.get(url)
    // }
    updata(_id,payload){
        let url=`/axios/goods/updata?id=${_id}`
        return axios.put(url,payload)
    }

    findOne(id){
        let url='/axios/goods/findOne?id='+id
        return axios.get(url)
    }

    find(show=1,page=2){
        let url='/axios/goods/find?'
        return axios.get(url,{params:{show,page}})
    }

    del(_id){
        let url=`/axios/goods/del?id=${_id}`
        return axios.delete(url)
    }

    add(payload){
        let url="/axios/goods/add"
        return axios.post(url,payload)
    }

    Update(id,putaway){
        let url = `/admin/goods/updata?id=${id}`
        return axios.put(url,{putaway})
    }

    Add(obj){
        let url=`/admin/goods/add`
        return axios.post(url,obj)
    }

}

// 抛出
export default new Api()