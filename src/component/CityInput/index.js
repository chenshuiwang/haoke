import React from 'react';
import indexCss from './index.module.scss'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
const Index = (props) => {
    return (<div>
        <div className={indexCss.search_content}>
            <div className={indexCss.search_left}>
                <div className={indexCss.city} onClick={() => props.history.push('/citySelect')}>
                    <span>{props.cityName}</span>
                    <i className="iconfont icon-arrow"></i>
                </div>
                <div className={indexCss.search}>
                    <i className="iconfont icon-seach"></i>
                    <input type="text" placeholder='请输入小区或地址' />
                </div>
            </div>
            <div className={indexCss.logo} onClick={() => props.history.push('/mapFound')}>
                <i className="iconfont icon-map"></i>
            </div>
        </div>
    </div>);
}
const mapStateToProps = (state) => {
    return {
        cityName: state.mapReducer.city.name
    }
}
export default withRouter(connect(mapStateToProps)(Index));