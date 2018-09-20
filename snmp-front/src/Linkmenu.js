
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Button } from 'antd';

import ApiHelper from './ApiHelper';

const SubMenu = Menu.SubMenu;


const MenuList = withRouter(props => {
  const { location, ipList, reload } = props;

  return (
    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
      <SubMenu
        key="comandos"
        title={<span><Icon type="desktop" /><span>Comandos</span></span>}
      >
        {
          ipList.map((pc) =>
            <Menu.Item key={"/comandos/" + pc.ip}>
              <Link to={"/comandos/" + pc.ip}>
                <Icon type="desktop" />
                {pc.ip}
              </Link>
            </Menu.Item>
          )
        }
      </SubMenu>

      <SubMenu
        key="graficos"
        title={<span><Icon type="pie-chart" /><span>Graficos</span></span>}
      >
        {
          ipList.map((pc) =>
            <Menu.Item key={"/graficos/" + pc.ip}>
              <Link to={"/graficos/" + pc.ip}>
                <Icon type="desktop" />
                {pc.ip}
              </Link>
            </Menu.Item>
          )
        }
      </SubMenu>
      {/* <SubMenu
        key="sub2"
        title={<span><Icon type="team" /><span>Team</span></span>}
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>File</span>
      </Menu.Item> */}
      <SubMenu
        key="reload"
        title={<span><Icon type="reload" /><span>Reload</span></span>}
      >
        <Menu.Item key={"reload"}>
            <Button onClick={reload}>
              Reload
            </Button>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
});




class Linkmenu extends React.Component {

  state = {
    ipList: []
  }

  componentDidMount = () => {
    this.reloadMenu();
  }

  reloadMenu = () => {
    fetch(ApiHelper.getApiUrl() + '/oids/iplist')
      .then(response => response.json())
      .then(ipList => {
        const filterIp = ipList.filter((pc) => pc.alive === true);
        this.setState({ ipList: filterIp })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <MenuList ipList={this.state.ipList} reload={this.reloadMenu}>
      </MenuList>
    )
  };
}


export default Linkmenu;

