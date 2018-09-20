import React, { Component } from 'react';
import './App.css';
import { Layout, Input, Select, Menu, Row, Col } from 'antd';
import { withRouter, Route } from 'react-router-dom';

import Linkmenu from './Linkmenu';
import Default from './content/Default'
import Comandos from './content/Comandos'
import Graficos from './content/Graficos'

import ApiHelper from './ApiHelper';

const Option = Select.Option;

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

  state = {
    collapsed: false,
    url: 'localhost',
    selectBefore: 'http://',
    selectAfter: ''
  };

  componentDidMount() {
    console.log(this.props.location.pathname);
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  setApi = (url) => {
    console.log(url);
    ApiHelper.setApiUrl(url + ":3001");
  }

  updateUrl = (url) => {
    this.setState({ url })
  }

  selectBeforeChange = (selectBefore) => {
    this.setState({ selectBefore })
  }

  selectAfterChange = (selectAfter) => {
    this.setState({ selectAfter })
  }

  selectBefore = (
    <Select onChange={this.selectBeforeChange} defaultValue="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );
  selectAfter = (
    <Select onChange={this.selectAfterChange} defaultValue="" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
      <Option value=".tk">.tk</Option>
      <Option value="">Nenhum</Option>
    </Select>
  );

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Linkmenu></Linkmenu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['10']}
            >
              <Menu.Item key="1">
                <Row>
                  <Col span={24}>
                    <div>
                      <Input style={{ marginTop: 7 }}
                        addonBefore={this.selectBefore}
                        addonAfter={this.selectAfter}
                        defaultValue="localhost"
                        onChange={e => this.updateUrl(e.target.value)}
                        onPressEnter={this.setApi(this.state.selectBefore + this.state.url + this.state.selectAfter)} />
                    </div>
                  </Col>
                </Row>
              </Menu.Item>
            </Menu>



          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route path="/localcomputer/:name" component={Default} />
            <Route path="/graficos/:ip" component={Graficos} />
            <Route path="/comandos/:ip" component={Comandos} />
            {/* <Route component={Default}/> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Adm redes ©2018 Created by Arthur Hoch
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
