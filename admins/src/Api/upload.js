import axios from '../utils/index' 
class Upload {
img (payload){
    let url='/axios/img/files'
    return axios.post(url,payload)
}

  
}

// 抛出
export default new Upload()