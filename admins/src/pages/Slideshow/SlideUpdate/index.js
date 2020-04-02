import React,{Component} from 'react'
import {Card,Input, message} from 'antd'
import style from './index.module.less'
import UploadApi from '@Api/Upload'
import config from '@config/index'
import SlideApi from  '@Api/Slideshow'
class SlideAdd extends Component{
    state = {
        list:[],
        name:'名字',
        desc:'描述',
        link:'链接',
    }
    findone = async ()=>{
        let {id} = this.props.match.params
        let {data} = await SlideApi.findone(id)
        this.setState({name:data[0].name,desc:data[0].desc,link:data[0].link})
    }
    componentDidMount(){
        this.findone()
    }
    // 上传图片
    upload = async ()=>{
        let file = this.refs.img.files[0]
        if(!file){return message.error('请先上传一张图片')}
        let {size,type} = file
        let types = ['jpg','jpeg','png','gif']
        if(size>1000000){return message.warning('图片超过1m')}
        if(types.indexOf(type.split('/')[1])===-1){return message.warning('图片类型只能是jpg,jpeg,gif,png')}
        let formData = new FormData()
        formData.append('src',file)
        let {code,msg,path} = await UploadApi.upload(formData)
        if(code){return message.error(msg)}
        this.setState({path})
    }
    add = async()=>{ 
        let {id} = this.props.match.params
        if(!this.state.path){return message.info('请先上传图片')}
        let {code,msg} = await SlideApi.update(id,this.state)
        if(code){return message.error(msg)}
        this.props.history.replace('/admin/slideshow')
    } 
    render(h) {
        let {name,desc,link,path} = this.state
        
        return(
            <div>
                <Card title='轮播图添加'>
                    名称:<Input placeholder='名字' className={style.input} value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}></Input><br/>
                    描述:<Input placeholder='描述' className={style.input} value={desc} onChange={(e)=>{
                        this.setState({desc:e.target.value})
                    }}></Input><br/>
                    地址:<Input placeholder='地址' className={style.input} value={link} onChange={(e)=>{
                        this.setState({link:e.target.value})
                    }}></Input><br/>
                    图片:<input type="file" ref='img' className={style.input}/> <button onClick={this.upload}>上传图片</button>
                        <img width='120' height='80' src={config.serverIp+path} alt=""/>
                        <button onClick={this.add}>修改</button>
                </Card>
            </div>
        )
    }
}
export default SlideAdd