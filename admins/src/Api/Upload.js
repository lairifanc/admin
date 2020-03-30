import axios from '@utils/index'
class Upload{
    upload(payload){
        let url = '/axios/img/files'
        return axios.post(url, payload)
    }
}

export default new Upload()