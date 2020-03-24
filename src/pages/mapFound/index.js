import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
class App extends Component {
    render() {
        return (<div className="map_found">
            <div className="nav">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >地图找房</NavBar>
            </div>
            <div className="map">
                <div id="container"></div>
            </div>
        </div>);
    }
}

export default App;