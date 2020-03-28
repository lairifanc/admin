import React, { Component } from 'react'
import Uilist from './Listdata'
import {withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
const { SubMenu } = Menu;

class CustomNav extends Component {

     // 点击获取侧边栏的信息antd内置方法
  handleClick = e => {
    let {path} = e.item.props
    this.props.history.replace(path)
  };

    // 侧边栏的渲染方法采用递归
  UIList=(data)=>{
    return data.map(ele=>{
       if (ele.children) {
         return (
           <SubMenu
           key={ele.key}
           title={
             <span>
               <Icon type={ele.icon} />
               <span>{ele.title}</span>
             </span>}>
             {this.UIList.bind(this,ele.children)()}
          </SubMenu>
         )
       }else{
           return (
             <Menu.Item key={ele.key} path={ele.path}><Icon type={ele.icon} />{ele.title}</Menu.Item>
           )
       }
     })
   }



    render() {
        return (
            <div style={{ width: 200 }}>
              <Menu
                mode="inline"
                theme="dark"
                onClick={this.handleClick}
              >
                {/* 侧边栏渲染 */}
                {this.UIList.bind(this,Uilist)()}
              </Menu>
            </div>
        )
    }
}

export default withRouter(CustomNav)
