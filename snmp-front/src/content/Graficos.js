
import React from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import {
    XAxis,
    YAxis,
    LineSeries,
    FlexibleWidthXYPlot
} from 'react-vis';




import ApiHelper from '../ApiHelper';


import '../../node_modules/react-vis/dist/style.css';


class Comandos extends React.Component {

    state = {
        functions: [],
        ip: '',
        saida: [],
        date: new Date(),
        cpu: [],
        memoria: [],
        uptime: 0,
        discoTotalGB: 0,
        discoLivreGb: 0,
        discoLivrePorcentagem: 0,
        name: ''
    }

    memoriaTimer;
    cpuTimer;
    uptimeTimer;

    componentWillUnmount = () => {
        clearInterval(this.memoriaTimer);
        clearInterval(this.cpuTimer);
        clearInterval(this.uptimeTimer);
    }

    formatUptime = (i) => {
        var val = parseInt((i / ((60 * 30)) / 2), 0);
        var dias = 0;
        var horas = 0;
        var minutoss = 0;
        if (val >= 1440) {
            dias = Math.floor(val / 1440);
            val = val - (dias * 1440);
        }
        if (val >= 60) {
            horas = Math.floor(val / 60);
            val = val - (horas * 60);
        }
        minutoss = Math.floor(val);

        var stringdias = '';
        var stringhoras = '';
        var stringminutoss = '';
        if (dias === 1) {
            stringdias = '1 dia ';
        } else if (dias > 1) {
            stringdias = dias + ' dias ';
        }

        if (horas === 1) {
            stringhoras = '1 hora ';
        } else if (horas > 1) {
            stringhoras = horas + ' horas ';
        }

        if (minutoss === 1) {
            stringminutoss = '1 minuto';
        } else if (minutoss > 1) {
            stringminutoss = minutoss + ' minutos';
        }

        var returnString = stringdias + stringhoras + stringminutoss
        return returnString.trim();
    }

    name = () => {
        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.2.1.1.1.0")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const name = result[0].value;
                this.setState({ name: name })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    disk = () => {
        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.4.1.2021.9.1.6.1")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const discoTotalGB = result[0].value / 1024000;
                this.setState({ discoTotalGB: discoTotalGB })
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.4.1.2021.9.1.7.1")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const discoLivreGb = result[0].value / 1024000;
                this.setState({ discoLivreGb: discoLivreGb });
                this.setState({ discoLivrePorcentagem: discoLivreGb * 100 / this.state.discoTotalGB });
            })
            .catch((err) => {
                console.log(err);
            });


    }

    uptime = () => {
        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.2.1.1.3.0")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const uptime = this.formatUptime(result[0].value);
                this.setState({ uptime: uptime })
            })
            .catch((err) => {
                console.log(err);
            });


        this.uptimeTimer = setInterval(() => {
            fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.2.1.1.3.0")
                .then(response => response.json())
                .then(result => {
                    const uptime = this.formatUptime(result[0].value);
                    this.setState({ uptime: uptime })
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 100);

    }

    memoria = () => {
        fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.4.1.2021.4.5.0")
            .then(response => response.json())
            .then(result => {
                const insert = {
                    x: this.state.memoria.length + 1, y: (result[0].value / 1024)
                }
                this.setState({ memoria: [...this.state.memoria, insert] })
            })
            .catch((err) => {
                console.log(err);
            });


        this.memoriaTimer = setInterval(() => {
            fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.4.1.2021.4.6.0")
                .then(response => response.json())
                .then(result => {
                    const insert = {
                        x: this.state.memoria.length, y: (result[0].value / 1024)
                    }
                    this.setState({ memoria: [...this.state.memoria, insert] })
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);



    }

    cpu = () => {
        const insert = {
            x: this.state.cpu.length + 1, y: 100
        }
        this.setState({ cpu: [...this.state.cpu, insert] })

        this.cpuTimer = setInterval(() => {
            fetch(ApiHelper.getApiUrl() + '/oids/' + this.state.ip + "/1.3.6.1.4.1.2021.11.10.0")
                .then(response => response.json())
                .then(result => {
                    const insert = {
                        x: this.state.cpu.length + 1, y: result[0].value
                    }
                    this.setState({ cpu: [...this.state.cpu, insert] })
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    }


    componentDidMount = () => {
        this.setState({ ip: this.props.match.params.ip });

        setTimeout(() => {
            fetch(ApiHelper.getApiUrl() + '/oids/list')
                .then(response => response.json())
                .then(functions => this.setState({ functions: functions }))
                .catch((err) => {
                    console.log(err);
                });

            this.uptime();
            this.memoria();
            this.cpu();
            this.disk();
            this.name();
        }, 1000);


    }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Graficos</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.ip}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row gutter={32}>
                        <Col span={12}>
                            <h1>Uso de CPU: {this.state.cpu.length > 0 ? this.state.cpu[this.state.cpu.length - 1].y : 0}%</h1>
                            <FlexibleWidthXYPlot height={300} >
                                <XAxis title="Coleta" position="start" />
                                <YAxis title="% CPU" />
                                <LineSeries
                                    className="first-series"
                                    data={this.state.cpu}
                                />
                                <LineSeries className="second-series" data={null} />

                            </FlexibleWidthXYPlot  >
                            <h1>Memória livre: {this.state.memoria.length > 0 ? this.state.memoria[this.state.memoria.length - 1].y : 0} MB</h1>
                            <FlexibleWidthXYPlot height={300}>
                                <XAxis title="Coleta" position="start" />
                                <YAxis title="GB disponivel" />
                                <LineSeries
                                    className="first-series"
                                    data={this.state.memoria}
                                />
                                <LineSeries className="second-series" data={null} />

                            </FlexibleWidthXYPlot>
                        </Col>
                        <Col span={12}>
                            <h1>Uptime</h1>
                            <h2>Tempo ligado: {this.state.uptime}</h2>
                            <h1>Disco</h1>
                            <h2>Tamanho disco GB: {this.state.discoTotalGB}</h2>
                            <h2>Disponivel disco GB: {this.state.discoLivreGb}</h2>
                            <h2>Disco utilizado: {this.state.discoLivrePorcentagem}%</h2>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    };
}


export default Comandos;