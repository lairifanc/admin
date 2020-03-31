import React, { Component } from 'react'
import {Card,Table,Button,Popconfirm, message,Modal,Input,notification} from 'antd'
import AdminApi  from '@Api/Administartor'
import style from './index.module.less'
export default class Administartor extends Component {
    state = {
        list:[],
        visible:false,
        "userName":'',
        "passWord":'',
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
                        </div>
                    )
               }
           }
         
        ]
    }
    listData = async ()=>{
        let {data} = await AdminApi.list()
        this.setState({list:data})
    }
    delData = async (_id)=>{
        let {err} = await AdminApi.del(_id)
        if(err!==200){return message.error('删除失败')}
        this.listData()
    }
    add = async()=>{
        let {passWord,userName} = this.state
        let result = await AdminApi.add(userName,passWord)
        console.log(result);
        if (result.err!==200){ return notification.error({description:'管理员添加失败，请详细检查传输',message:'错误',duration:1.5})}
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
        let {columns,list,visible,passWord,userName} = this.state
        return (
            <div>
                <Card title='账号管理'>
                    <Button type='primary' icon="plus"
                        onClick={()=>{
                            this.setState({visible:true})
                        }}
                    >账号添加</Button>
                  <Table dataSource={list} columns={columns} rowKey='_id'></Table>  
                </Card>
                {/* 添加模态框 */}
                <Modal
                 title='添加管理员'
                 visible={visible}
                 onOk={this.add}
                 onCancel={this.close}
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
