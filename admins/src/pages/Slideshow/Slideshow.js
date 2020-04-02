import React, { Component } from 'react'
import {Card,Table,Button,Popconfirm, message,Pagination} from 'antd'
import SlideApi from '@Api/Slideshow'
import config from '@config/index'
export default class Slideshow extends Component {
    state = {
        list:[],
        page:1,
        pageSize:2,
        pages:0,
        columns:[
            {
            title:'_id',
            dataIndex:'_id',
            key:'_id'
            },
            {
                title:'姓名',
                dataIndex:'name',
                key:'name'
                
            },
            {
                title:'描述',
                dataIndex:'desc',
                key:'key'
            },
            {
                title:'图片',
                dataIndex:'path',
                key:'path',
                render:(recode)=>{
                    let result = config.serverIp + recode
                    return(<img width ='150' height='80'src={result} alt=''/>)
                },
            },
            {
                title:'链接地址',
                dataIndex:'link',
                key:'link'
            },
            {
                title:'操作',
                key:'action',
                render:(recode)=>{
                    return(
                        <div>
                            <Popconfirm title='你确定删除吗？'
                            onConfirm={()=>{this.del(recode._id)}}
                            >
                                <Button type='danger' size='small'>删除</Button><br/>
                            </Popconfirm>
                            
                            <Button type='primary' size='small'
                            onClick={()=>{
                                this.props.history.replace(`/admin/slideupdate/${recode._id}`)
                            }}
                            >修改</Button>
                        </div>
                    )
                }
            }
        ]
    }
    //获取轮播数据
    slide = async ()=>{
        let {page,pageSize} = this.state
        let {data,pages} = await SlideApi.list(page,pageSize)
        this.setState({list:data,pages})
       
    }
    del = async(_id)=>{
        let {code,msg} = await SlideApi.del(_id)
        if(code){return message.error(msg)}
        this.slide()
    }
    componentDidMount(){
        this.slide()
    }
    render() {
        let {columns,list,page,pageSize,pages} = this.state
        return (
            <div>
                <Card title='轮播图'>
                    <Button type='primary' icon="plus"
                    onClick={()=>{

                        this.props.history.replace('/admin/slideAdd')
                    }}
                    >
                    添加轮播图</Button>
                    <Table dataSource={list} columns={columns} rowKey='_id' pagination={false}>
                    
                    </Table>
                    {/* 分页器 */}
                <Pagination
                 current={page} total={pages} showQuickJumper pageSize={pageSize}
                   onChange={(page)=>{
                        //只要页码数发生改变就会触发          
                        this.setState({page},()=>{
                            this.slide()
                        })   
                    }}
                />
                </Card>
                
            </div>
        )
    }
}
