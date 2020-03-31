import axios from '@utils/index.js'
class Administartor {
    // 获取账号的接口
    list(){
        let url = '/axios/user/find'
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
}

export default new Administartor()