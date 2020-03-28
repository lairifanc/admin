// 统一api支援管理
import axios from '../utils/index' 


class Api {
    // 查询
    find(show,page){
        let url=`/admin/goods/find?show=${show}&page=${page}`
        return axios.get(url)
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