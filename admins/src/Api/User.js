// 统一api支援管理
import axios from '../utils/index' 


class Api {


    // 登入请求**************************************************
    enter(obj){
        let url='/axios/user/enter'
        return axios.post(url,obj)
    }
}

// 抛出
export default new Api()