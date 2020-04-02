import React, { Component } from 'react';
import style from  './index.module.less'
import uploadApi from '../../../Api/upload'
import Auditapi from '../../../Api/Audit'
import config from '../../../config/index'
import {Card, message} from 'antd';
class GoodsAdd extends Component {
  state = {
    "name":"周杰伦",
    "desc":'自以为打球很帅',
    "phone":13432836214,
    'path':null,
    'card':0,
    "putaway":440402199602063964,
   
  }
  async componentDidMount(){
     let {id} =this.props.match.params
     let{err,mag,data} =await Auditapi.findOne(id)
    // let result =await Auditapi.findOne(id)
    //  console.log(result)
    if(err !==200){return message.err(mag)}
    // this.setState({state:data[0]})/
    this.setState({...data[0]})
  }
  // 添加商品
  submit=async()=>{
    let {id} =  this.props.match.params
   if (!this.state.path){return message.info('请先上传图片')}
   let {err,mag}  = await Auditapi.upDate(id,this.state)
   if(err==403){ return message.error(mag)} else if(err==404){ return message.error(mag)}
  //  console.log(this)
   message.success(mag)
   this.props.history.replace('/admin/audit')
  }
  // 图片上传
  imgupload= async ()=>{
    // 1. 获取图片里的内容
    let  file = this.refs.img.files[0]
    if(!file){ return message.error('请先选择一张图片')}
    // 图片的验证
    let {size,type} = file 
    console.log(type)
    let types = ['jpg',"jpeg",'gif','png']
    if(size>1000000){ return message.warning('图片超过1m')}
    if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
    
     let formData = new FormData()
    formData.append('src',file)
    let {err,mag,path} = await uploadApi.upload(formData)
    if(err==200){
      message.success(mag)
      this.setState({path})
    }
    
    
  }
  render() { 
    let {name,desc,path,phone,card,putaway} = this.state
    return ( 
      <div className={style.box}>
         <Card title='商品修改'>
            名称: <input type='text' value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
            }}/><br/>
            描述: <input type='text' value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
            }}/><br/>
            身份证: <input type='text' value={putaway} onChange={(e)=>{
              this.setState({putaway:e.target.value})
            }}/><br/>
            电话: <input type='text' value={phone} onChange={(e)=>{
              this.setState({phone:e.target.value})
            }}/><br/>
            发布状态: 
            <select value={card} onChange={(e)=>{
              this.setState({card:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select>
             <br/>
           
            {/* 缩略图 */}
            缩略图:
            <input type="file" ref='img'/> <button onClick={this.imgupload}>上传图片</button>
            {/* {config.serverIp} */}
            <img width='120' height='80' src={config.serverIp+path} alt=""/>
            <button onClick={this.submit}>修改</button>
         </Card>
      </div>
     );
  }
}
 
export default GoodsAdd;
/*
商品添加
1.用户输入信息
2.获取用户输入的信息
3.调用添加接口
4.添加成功后 可以在页面不动 也可以跳转回列表页
*/ 