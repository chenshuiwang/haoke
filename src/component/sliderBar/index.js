import React, { Component } from 'react';
import indexCss from './index.module.scss'
class Index extends Component {
    render() {
        return <div 
        className={[indexCss.sliderBar, indexCss.slider_out, indexCss.slider_in].join(' ')}>
            {this.props.children}
        </div>
    }
}

export default Index;