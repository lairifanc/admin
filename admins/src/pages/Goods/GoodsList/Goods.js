import React, { Component } from 'react'
import {Card,message,Table,Tag,Button,Pagination,Popconfirm} from 'antd'
import goodsApi from '../../../Api/Goods'
import style from './index.module.less'
let rootPath='http://101.37.168.44:3030'
class Goods extends Component {
    state={
        page:1,//页码数
        show:2,//每页显示的条数
        result:[],//列表数据
        pages:0,//总数量
        columns:[
        {title: '_id',dataIndex: '_id',key: '_id', width:120,fixed:'left'},
        {title: '名称',dataIndex: 'name',key: 'name',width:120},
        {title: '库存',dataIndex: 'stock',key: 'stock',width:80},
        {title: '价格',dataIndex: 'price',key: 'price',width:100},
        {title: '缩略图',dataIndex: 'path',key: 'path',render(path){
            return(<img width='150' height='80' src={rootPath+path} alt=""/>)
        },width:150},
        {title: '描述',dataIndex: 'desc',key: 'desc',width:120},
        {title: '单位',dataIndex: 'unit',key: 'unit',width:80},
        {title: '状态',dataIndex: 'putaway',key: 'putaway',render(putaway){
            let obj={'-1':{color:'red',mag:'已下架'},'0':{color:'yellow',mag:'未上架'},'1':{color:'green',mag:'已上架'}}
            return(
                <Tag color={obj[putaway].color}>{obj[putaway].mag}</Tag>
            )
        },width:120},
        {title: '操作',key: 'action',width:120,fixed:'right',render:(recode)=>{
            return(
                <div>
                    <Popconfirm title='你确定要删除该条数据吗？'
                    onConfirm={()=>{this.delGodds(recode._id)}}>
                      <Button type='danger' size='small'>删除</Button>
                    </Popconfirm>
                    {/* <Popconfirm title='你确定要上架该商品吗？'>
                      <Button type='warn' size='small'>上架</Button>   
                    </Popconfirm> */}
                      <Button type='primary' size='small' onClick={()=>{
                          //跳转到修改页面 传递当前id
                          this.props.history.replace('/admin/GoodsInfoUpdata/'+recode._id)
                      }}>修改</Button>
                </div>
            )
        }},
    ]
    }
    componentDidMount(){
        this.getListData()
    }
    //删除商品
    delGodds=async(_id)=>{
        let {err,mag}=await goodsApi.del(_id)
        if(!err==200){return message.error(mag)}
        this.getListData()
    }
    //获取商品数据
    getListData=async()=>{
        let {show,page}=this.state
        let {err,mag,result,pages}=await goodsApi.find(show,page)
        console.log(err,result,mag,pages);
        if(err!==400){return message.error(mag)}
        this.setState({result,pages})
    }
    render() {
        let {result,columns,pages,page,show}=this.state
        return (
            <div className={style.box}>
                <Card title='商品列表' className={style.card}>
                <Button type='primary' onClick={()=>{
                    console.log(this)
                    this.props.history.push('/admin/goodadd')
                }}>商品添加</Button>
                    {/* 表格内容 */}
                  <Table 
                  scroll={{y:300,x:840}} 
                  pagination={false}
                  dataSource={result} 
                  columns={columns} 
                  rowKey='_id'> 
                  </Table>
                  {/* 分页器 */}
                  <Pagination current={page} showQuickJumper total={pages} pageSize={show}
                  onChange={(page,pageSize)=>{
                      //只要页码数发生改变就会触发
                      this.setState({page},()=>{
                          this.getListData()
                      })
                  }}
                  />
                </Card>
            </div>
        )
    }
}
export default Goods