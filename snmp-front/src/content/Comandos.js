
import React from 'react';
import { Breadcrumb, Row, Col, List, Button, Timeline, Icon, Tag, Card, Input } from 'antd';
import Moment from 'react-moment';

import ApiHelper from '../ApiHelper';

const Search = Input.Search;


class Comandos extends React.Component {

    state = {
        functions: [],
        ip: '',
        saida: [],
        date: new Date()
    }


    componentWillReceiveProps = (props) => {
        this.setState({ ip: props.match.params.ip })
    }

    componentDidMount = () => {
        console.log("Api url: ", ApiHelper.getApiUrl());

        fetch(ApiHelper.getApiUrl() + '/oids/list')
            .then(response => response.json())
            .then(functions => this.setState({ functions: functions }))
            .catch((err) => {
                console.log(err);
            });
        this.setState({ ip: this.props.match.params.ip })
        console.log(this.state.functions);
    }

    executarOid = (oid) => {

        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/" + oid)
            .then(response => response.json())
            .then(result => {
                result.forEach(item => item.date = new Date());
                this.setState(({ saida: [...this.state.saida, result] }))
            })
            .catch((err) => {
                console.log(err);
            });

        console.log(this.state.saida);
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Comandos</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.ip}</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row gutter={32}>
                        <Col span={12}>
                            <Card style={{ margin: 10 }} title="Consulta" bordered={true}>
                                <Search
                                    placeholder="input oid numbers"
                                    onSearch={value => this.executarOid(value)}
                                    style={{ width: 200 }}
                                />
                            </Card>
                            <List
                                size="large"
                                bordered
                                itemLayout="horizontal"
                                dataSource={this.state.functions}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span>{item.type}</span>}
                                            description={<span>
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={item.oids}
                                                    renderItem={pc => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                title={<span>{pc.oid}</span>}
                                                                description={
                                                                    <span>
                                                                        <label>{pc.name}</label>
                                                                    </span>}
                                                            />
                                                            <Button onClick={() => this.executarOid(pc.oid)}>
                                                                Executar
                                                            </Button>

                                                        </List.Item>
                                                    )}
                                                />
                                            </span>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>

                            <Timeline mode="alternate" reverse={true}>
                                {
                                    this.state.saida.map((f, key) =>
                                        <Timeline.Item key={key}>
                                            {
                                                f.map((result, key) =>
                                                    <div key={key}>
                                                        <Tag style={{ marginLeft: '10px' }} color="geekblue">
                                                            <Moment format="DD/MM/YYYY HH:mm:ss">
                                                                {result.date}
                                                            </Moment>
                                                        </Tag>
                                                        <p>OID: {result.oid}</p>
                                                        <p>Retorno: {result.value}</p>
                                                    </div>
                                                )
                                            }
                                        </Timeline.Item>
                                    )
                                }
                                <Timeline.Item color="green">
                                    <Icon type="desktop"></Icon>
                                    {this.state.ip}
                                    <Tag style={{ marginLeft: '10px' }} color="geekblue">
                                        <Moment format="DD/MM/YYYY HH:mm:ss">
                                            {this.state.date}
                                        </Moment>
                                    </Tag>
                                </Timeline.Item>
                            </Timeline>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    };
}


export default Comandos;