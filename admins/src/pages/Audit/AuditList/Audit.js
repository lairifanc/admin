import React, { Component } from 'react'
import {Card,Table,Popconfirm,Button,Tag,message,Pagination} from 'antd'
import style from './index.module.less'
import Auditapi from '../../../Api/Audit'
let rootPath = 'http://101.37.168.44:3030'
export default class Audit extends Component {
    state={
        show:1,
        page:2,
        list:[],
        count:1,
        columns :[
            {title: '_id',dataIndex: '_id',key: '_id',width:120,fixed:'left'},
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
        title: '图片地址',
        dataIndex: 'path',
        key: 'path',
        render(path){
            return(<img width ='150' height='80' alt='' src={rootPath+path}/>)
          },width:150
      },
      {
        title: '状态',
        dataIndex: 'card',
        key: 'card',
        render(card){
            let obj={'-1':{color:'red',msg:'未审核'},
            '0':{color:'yellow',msg:'待审核'},
            '1':{color:'green',msg:'已审核'}}
            return(<Tag color={obj[card].color}>{obj[card].msg}</Tag>)
            
        }
      ,width:120},
      {
        title: '身份证',
        dataIndex: 'putaway',
        key: 'putaway',
      },
      {title: '操作',key: 'action',width:120,fixed:'right',render:(recode)=>{
        // console.log(recode)
        return(
          <div>

             <Popconfirm
    title="确定删除该商品？"
    onConfirm={()=>{this.delCustomer(recode._id)}}
     >
        <Button type='danger' size='small'>删除</Button>
    </Popconfirm>
          
         
           <Button type='primary' size='small'
           onClick={()=>{
             this.props.history.push('/admin/auditUpdate/'+recode._id)
           }}
           >更新</Button>
           
          </div>
        )
      }}
      
  ]
    }
    getListData= async ()=>{
        let {page,show}  = this.state
        let {err,mag,result,pages} = await Auditapi.list(page,show)
        // let {code,msg,list,count} = result
        // console.log(result.length)
        if(err !==400){ return message.error(mag)}
        this.setState({list:result,count:pages})
      }
      
      componentDidMount(){
      // console.log(132132132132)
       this.getListData()
    }
   
    delCustomer=async(_id)=>{
        let {err,mag} =await Auditapi.del(_id)
        if(err==404){return message.error(mag)} else if(err==403){return message.error(mag)}
        message.success(mag)
        this.getListData()
    }
    
    render() {
        let {columns,list,show,page,count} =this.state
        return (
            <div className={style.box}>
               <Card title='审核管理列表'>
               <Button type='primary' onClick={()=>{
            //  console.log(this)
             this.props.history.push('/admin/auditAdd')
           }}>添加</Button>
               <Table dataSource={list} columns={columns} rowKey='_id'
               pagination={false}
               >


               </Table>
                     {/* 分页器 */}
            <Pagination defaultCurrent={1} total={count} defaultCurrent={1} defaultPageSize={page}
                onChange={(page)=>{
                this.setState({show:page},()=>{
                  this.getListData()
                })
                 }}
                
                />
               </Card>
            </div>
        )
    }
}
