import axios from '@utils/index.js'
class Administartor {
    // 获取账号的接口
    list(show,page){
        let url = `/axios/user/find?show=${show}&page=${page}`
        return axios.get(url)
    }
    // 删除账号的接口
    del(_id){
        let url = `/axios/user/del?id=${_id}`
        return axios.delete(url,_id)
    }
    // 账号添加接口
    add(userName,passWord){
        let url = `/axios/user/register`
        return axios.post(url,{userName, passWord})
    }

    findOne(id){
        let url = `/axios/user/findOne?id=${id}`
        return axios.get(url)
    }

    updata(id,obj){
        let url = `/axios/user/updata?id=${id}`
        return axios.put(url,obj)
    }
    
}

export default new Administartor()