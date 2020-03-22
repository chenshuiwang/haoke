import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
class App extends Component {
    render() {
        return (<div className='citySelect'>
            {/* 头部 */}
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
            >选择城市</NavBar>
        </div>);
    }
}

export default App;