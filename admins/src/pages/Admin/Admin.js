import React, { Component } from 'react'
import { Layout} from 'antd';
import Ui from '../../components/CustomNav/CustomNav'
const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };


    render() {
        return (
        <Layout style={{ minHeight: '100vh' }}>


          {/* 侧边 */}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Ui></Ui>
        </Sider>
        <Layout>
                {/* 头部 */}
          <Header style={{ background: '#fff', padding: 0 }} />


                {/* 内容区域 */}
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>



                {/* 底部 */}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
        )
    }
}
