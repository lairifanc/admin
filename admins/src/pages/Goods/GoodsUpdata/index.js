import React,{Component} from 'react';
import style from './index.module.less'
import uploadApi from '../../../Api/upload'
import goodsApi from '../../../Api/Goods'
import config from '../../../config.js'
import {Card, message} from 'antd';
class GoodsUpdata extends Component{
    state={
        "name":"默认菜名",
        "desc":"难吃",
        "path":'',
        "stock":"998",
        "putaway":0,
        "price":888,
        "unit":"件",
        "link":"http://baidu.com",
    }
    async componentDidMount(){
      //获取id
      let {id}=this.props.match.params
      //通过id 获取修改信息
      let {err,data}=await goodsApi.findOne(id)

      this.setState({...data[0]})
    }
    //添加商品
    submit=async()=>{
    let {id}=this.props.match.params
     if(!this.state.path){return message.info('请先上传图片')}
     //调用修改的接口

     let {err}=await goodsApi.updata(id,this.state)
     if(!err){return message.error('mag')}
     this.props.history.replace('/admin/goodsadd')
    }
    //图片上传
    upload=async ()=>{
        //获取图片内容
    let file=this.refs.img.files[0]
    if(!file){return message.error('请选择一张图片')}
    //图片的验证
    let {size,type}=file
    let types=['jpg','jpeg','png','gif']
    if(size>1000000){return message.warning('图片超过1M')}
    if(types.indexOf(type.split('/')[1])===-1){return message.warning('只允许jpg，jpeg,png,gif四种类型')}
    //调用接口
    //将图片转化为fromdata
    let fromdata=new FormData()
    fromdata.append('src',file)
    let {err,mag,path}=await uploadApi.img(fromdata)
    if(!err){return message.error(mag)}
    this.setState({path})
    }
    render(){
        let {name,desc,path,stock,putaway,price,unit,link}=this.state
        //判断path是不是base64
        let basePath=path
        if(basePath.indexOf('base64')==-1){basePath=config.serverIp+path}
      return(
       <div className={style.box}>
           <Card title="商品添加">
             名称：<input type='text' value={name} onChange={(e)=>{this.setState({name:e.target.value})}}/><br/>
             描述：<input type='text' value={desc} onChange={(e)=>{this.setState({desc:e.target.value})}}/><br/>
             链接：<input type='text' value={link} onChange={(e)=>{this.setState({link:e.target.value})}}/><br/>
             库存：<input type='number' value={stock} onChange={(e)=>{this.setState({stock:e.target.value})}}/><br/>
             {/* 发布状态： <select value={putaway} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select><br/> */}
             价格：<input type='number' value={price} onChange={(e)=>{this.setState({price:e.target.value})}}/><br/>
             单位：<input type='text' value={unit} onChange={(e)=>{this.setState({unit:e.target.value})}}/><br/>
             {/* 缩略图 */}
             缩略图：
             <input type="file" ref='img'/><button onClick={this.upload}>上传图片</button>

             <img width='120' height='80' src={basePath} alt=""/>
            <button onClick={this.submit}>修改</button>
           </Card>
       </div>
      );
    }
}

export default GoodsUpdata;