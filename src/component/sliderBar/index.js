import React, { Component } from 'react';
import indexCss from './index.module.scss'
class Index extends Component {
    render() {
        console.log(this.props)
        const filterList = this.props.data
        return <div className={[indexCss.sliderBar, indexCss.slider_out, indexCss.slider_in].join(' ')}>
            {filterList.map((v, i) => <div className={indexCss.slider_item} key={i}>
                <div className={indexCss.slider_item_title}>{v.label}</div>
                <div className={indexCss.slider_item_child}>
                    {v.children.map((vv, ii) => <span key={ii}>{vv.label}</span>)}
                </div>
            </div>)}
            <div className={indexCss.btns}>
                <div className={indexCss.btns_cancel} onClick={this.filterCancel}>取消</div>
                <div className={indexCss.btns_item}>确定</div>
            </div>
        </div>
    }
}

export default Index;