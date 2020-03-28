import React, { Component } from 'react'
import Style from './index.module.less'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import Api from '../../Api/User'


class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };





    // 点击登入的方法 ********************************** 
    handleSubmit = e => {
        e.preventDefault();
        // // 使用内置的方法穿过来的值
        this.props.form.validateFields((err, values) => {
            // 先判断孝证的方法符合不？
          if (!err) {
            //   符合进入下一步 结构值
            let {userName,passWord}=values
            // 执行方法发送请求拿数据
            Api.enter({userName,passWord}).then((data)=>{
                // 获取到的数据判断  404登入失败  200成功
                if (data.err==404) {
                    message.error('用户名或密码错误');
                }else{
                    message.success('登入成功3s后跳转页面',3,()=>{
                        this.props.history.replace('/admin') 
                    });
                }
            })
          }else{
            // 不符合弹窗警告
            message.error('请输入正确格式的用户名或密码');
          }
        });
      };





    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className={Style.login_box}>
        <Form onSubmit={this.handleSubmit} className={Style.login_form}>
        
        {/* 用户******************** */}
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
                // 孝证方法********************************
                {required: true, message: '请输入您的用户名!' },
                {max:9,message:'用户名最大长度九位'},
                {min:2,message:'用户名最小长度二位'}
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>



        {/* 密码********************* */}
        <Form.Item>
          {getFieldDecorator('passWord', {
            rules: [{ required: true, message: '请输入您的用户密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="用户密码"
            />,
          )}
        </Form.Item>


        {/* 记住我 *********************************************/}
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记密码
          </a> <Button type="primary" htmlType="submit" className="login-form-button">
            登 入
          </Button>
          <a href=""> 立即注册!</a>
        </Form.Item>
      </Form>
      </div>
        )
    }
}


export default  Form.create()(Login)
