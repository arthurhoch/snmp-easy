
import React from 'react';
import { Breadcrumb } from 'antd';

class Default extends React.Component {

    componentDidMount = () => {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    Bill is a cat {this.props.match.params.name}.
                </div>
            </div>
        )
    };
}


export default Default;