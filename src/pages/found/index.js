import React, { Component } from 'react';
import { connect } from "react-redux"
import { NavBar, Icon } from 'antd-mobile';
import indexCss from './index.module.scss'
import Input from '../../component/CityInput'
import FilterPanel from '../../component/filterPanel'
class Index extends Component {
    state = {
        filterData:{}
    }
    async componentDidMount() {

    }
    render() {
        const {filterData} = this.props
        return (<div className={indexCss.found}>
            {/* 头部 */}
            <div className={indexCss.nav}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    style={{backgroundColor:"#eee"}}
                ></NavBar>
                <div className={indexCss.input_content}>
                    <Input />
                </div>
            </div>
            {/* 筛选组件 */}
            <FilterPanel data={filterData}/>
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        city: state.mapReducer.city.name
    }
}
export default connect(mapStateToProps)(Index);


