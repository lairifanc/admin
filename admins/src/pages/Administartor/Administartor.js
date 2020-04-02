import React, { Component } from 'react'
import {Card,Table,Button,Popconfirm, message,Modal,Input,notification,Pagination} from 'antd'
import AdminApi  from '@Api/Administartor'
import style from './index.module.less'
export default class Administartor extends Component {
    state = {
        list:[],
        visible:false,
        "userName":'',
        "passWord":'',
        pages:1,
        show:4,
        page:1,
        columns:[
           {
                title:'_id',
                dataIndex:'_id',
                key:'_id'
           },
           {
               title:'usernName',
               dataIndex:'userName',
               key:'userName'
           },
           {
               title:'passWord',
               dataIndex:'passWord',
               key:'passWord'
           },
           {
               title:'操作',
               key:'action',
               render:(recode)=>{
                    return(
                        <div>
                        <Popconfirm title="你确定要删除吗？"
                            onConfirm = {()=>{
                                this.delData(recode._id)
                            }}
                        >
                            <Button type='danger' size='small'>删除</Button><br/>
                        </Popconfirm>
                        <Button type='primary' size='small'
                            onClick={()=>{
                                this.props.history.push(`/admin/adminupdate/${recode._id}`)
                            }}
                        >修改</Button>
                        </div>
                    )
               }
           }
         
        ]
    }
    listData = async ()=>{
        let {result,pages} = await AdminApi.list(this.state.show,this.state.page)
        this.setState({list:result,pages})
    }
    delData = async (_id)=>{
        let {err,mag} = await AdminApi.del(_id)
        if(err==404){return message.error(mag)}else if(err==403){return message.error(mag)}
        message.success(mag)
        this.listData()
    }
    add = async()=>{
        let {passWord,userName} = this.state
        let result = await AdminApi.add(userName,passWord)
        if (result.err==404){ return notification.error({description:result.mag,message:'错误',duration:1.5})}
        else if(result.err==403){ return notification.error({description:result.mag,message:'错误',duration:1.5})}
        notification.success({description:'管理员添ok，模态框即将关闭',message:'成功',duration:1.5})
        this.setState({visible:false})
        this.listData()
    }
    close = async ()=>{
        this.setState({visible:false})
    }
    componentDidMount(){
        this.listData()
    }
    render() {
        let {columns,list,visible,passWord,userName,show,pages,page} = this.state
        return (
            <div>
                <Card title='账号管理'>
                    <Button type='primary' icon="plus"
                        onClick={()=>{
                            this.setState({visible:true})
                        }}
                    >账号添加</Button>
                  <Table dataSource={list} columns={columns} rowKey='_id' pagination={false}></Table>  
                  <Pagination defaultCurrent={1} total={pages} defaultCurrent={1} defaultPageSize={show}
                onChange={(page)=>{
                this.setState({page},()=>{
                  this.listData()
                })
                 }}
                
                />
                </Card>
                {/* 添加模态框 */}
                <Modal
                 title='添加管理员'
                 visible={visible}
                 onOk={this.add}
                 onCancel={this.close}
                 pagination={false}
                >
                    账号:<Input className={style.input} value={userName} onChange={(e)=>{
                        this.setState({userName:e.target.value})
                    }}></Input><br/>
                    密码:<Input className={style.input} value={passWord} onChange={(e)=>{
                        this.setState({passWord:e.target.value})
                    }}></Input>
                </Modal>
            </div>
        )
    }
}
