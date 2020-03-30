import React, { Component } from 'react'
import {Card,Table,Button,Popconfirm, message} from 'antd'
import SlideApi from '@Api/Slideshow'
export default class Slideshow extends Component {
    state = {
        list:[],
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
                key:'path'
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
                            <Popconfirm title='确定修改吗？'>
                                <Button type='primary' size='small'>修改</Button>
                            </Popconfirm>
                            
                        </div>
                    )
                }
            }
        ]
    }
    //获取轮播数据
    slide = async ()=>{
        let {data} = await SlideApi.list()
        console.log(data);
        this.setState({list:data})
       
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
        let {columns,list} = this.state
        return (
            <div>
                <Card title='轮播图'>
                    <Button type='primary'
                    onClick={()=>{
                        console.log(this);
                        this.props.history.replace('/admin/slideAdd')
                    }}
                    >
                    添加轮播图</Button>
                    <Table dataSource={list} columns={columns} rowKey='_id'>
                    
                    </Table>
                </Card>
            </div>
        )
    }
}
