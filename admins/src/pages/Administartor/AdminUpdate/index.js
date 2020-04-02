import React,{Component} from 'react'
import Api from '../../../Api/Administartor'
import {Card,Input,Button,message} from 'antd'
import style from './index.module.less'

class AdminUpdate extends Component{
    state = {
        "userName":'',
        "passWord":''
    }
    async componentDidMount(){
        let {data}=await Api.findOne(this.props.match.params.id)
        this.setState({...data[0]})
    }
    
    render(){
        let {userName,passWord} = this.state
        return(
            <div>
                <Card title='账号修改'>
                    账号:<Input className={style.input} value={userName} onChange={(e)=>{
                        this.setState({userName:e.target.value})
                    }}></Input><br/>
                    密码:<Input className={style.input} value={passWord} onChange={(e)=>{
                        this.setState({passWord:e.target.value})
                    }}></Input><br/>
                    <Button type='primary' icon='edit' className={style.edit} onClick={async ()=>{
                        if (userName&&passWord) {
                            let {err,mag}=await Api.updata(this.props.match.params.id,this.state)
                            if (err==403) {
                                return message.error(mag)
                            }else if(err==404){
                                return message.error(mag)
                            }else{
                                message.success(mag) 
                                this.props.history.push(`/admin/administartor`)
                            }
                            
                        }else{
                            message.error('请输入内容');
                            
                        }
                    }}
                    >修改</Button>
                </Card>
            </div>
        )
    }
}

export default AdminUpdate