import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from "react-redux";
import axios, { baseURL } from '../../utils/axios'
import indexCss from './index.module.scss'
import { List } from 'react-virtualized';
import {getPointAction,clearCityAction} from '../../store/actionCreator'
class App extends Component {
    state = {
        list: [],
        letters:["#","热"],
        currentIndex:0
    }
    componentDidMount() {

        this.getCurrentCity();
        this.getHotCity();
        this.getAllCity();
    }
    getCurrentCity() {
        this.state.list.push({
            name: '当前定位',
            value: [this.props.cityName]
        })
        this.setState({
            list: this.state.list
        })
    }
    async getHotCity() {
        let res = await axios.get(baseURL + '/area/hot')
        this.state.list.push({
            name: '热门城市',
            value: res.data.body.map(v => v.label)
        })
    }
    async getAllCity() {
        let res = await axios.get(baseURL + "/area/city?level=1")
        this.setState({
            allCity: res.data.body
        })
        let arr = this.state.allCity.sort((a, b) => a.short > b.short ? 1 : -1);
        arr.forEach(v => {
            const first = v.short[0].toUpperCase();
            const index = this.state.list.findIndex(vv => vv.name === first);
            if (index === -1) {
                this.state.list.push({
                    name: first,
                    value: [v.label]
                })
                this.state.letters.push(first)
            } else {
                this.state.list[index].value.push(v.label);
            }
        })
        this.setState({
            list: this.state.list,
            letters:this.state.letters
        })
    }
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const v = this.state.list[index]
        return (
            <div className={indexCss.city_item} key={key} style={style}>
                <div className={indexCss.city_title}>{v.name}</div>
                {v.value.map(vv => <div className={indexCss.city_name} key={vv} onClick={this.clickCity.bind(this,vv)}>{vv}</div>)}
            </div>
        );
    }
    //设置列表行高度
    rowHeight = ({index}) => {
        return 40 + this.state.list[index].value.length * 40
    }
    // 字母点击事件
    letterClick = (currentIndex) => {
        this.setState({currentIndex})
    }
    // 列表滚动事件
    onRowsRendered = ({startIndex}) => {
        this.setState({currentIndex:startIndex})
    }
    clickCity = (city) => {
        this.props.changeCity(city)
        this.props.history.go(-1)
    }
    render() {
        const {letters,currentIndex} = this.state
        return (<div className={indexCss.citySelect}>
            {/* 头部 */}
            <div className={indexCss.citySelect_nav}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >选择城市</NavBar>
            </div>
            {/* 城市列表 */}
            <div className={indexCss.cityList}>
                <List
                    width={window.screen.width}
                    height={window.screen.height-45}
                    rowCount={this.state.list.length}
                    rowHeight={this.rowHeight}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered = {this.onRowsRendered}
                    scrollToIndex = {this.state.currentIndex}
                    scrollToAlignment = "start"
                />
            </div>
            {/* 右边城市选择 */}
            <div className={indexCss.right}>
                {letters.map((v,i) =><div className={
                    [indexCss.item,currentIndex === i?indexCss.active:''].join(' ')} 
                    key={i}
                    onClick={this.letterClick.bind(this,i)}>
                    {v}
                </div>)}
            </div>
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.mapReducer.city.name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeCity(city){
            dispatch(getPointAction(city))
            dispatch(clearCityAction())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);