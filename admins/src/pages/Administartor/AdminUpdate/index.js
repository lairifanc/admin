import React,{Component} from 'react'
import {Card,Input,Button} from 'antd'
import style from './index.module.less'

class AdminUpdate extends Component{
    state = {
        "userName":'',
        "passWord":''
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
                    <Button type='primary' icon='edit' className={style.edit}
                    >修改</Button>
                </Card>
            </div>
        )
    }
}

export default AdminUpdate