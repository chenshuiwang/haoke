import React, { Component } from 'react';
import { connect } from "react-redux"
import { NavBar, Icon } from 'antd-mobile';
import indexCss from './index.module.scss'
import Input from '../../component/CityInput'
import FilterPanel from '../../component/filterPanel'
import axios from "../../utils/axios"
import HouseList from '../../component/houseList'
import { List } from 'react-virtualized';
class Index extends Component {
    Prams = {
        cityId: '',
        start: 1,
        end: 20
    }
    FilterParams = {}
    state = {
        list: [],
        allNum: 0
    }
    isLoading = true
    async componentDidMount() {
        const res = await axios.get('/area/info?name=' + this.props.city)
        this.Prams.cityId = res.data.body.value
        this.getList()
    }
    getList = async () => {
        // this.setState({ list:[]  });
        const res = await axios.get('/houses', { params: this.FilterParams })
        this.setState({
            list: [...this.state.list,...res.data.body.list],
            allNum: res.data.body.count
        })
        this.isLoading = true;
        console.log(res)
    }
    rowRenderer = ({ index, style, key }) => {
        return <div style={style} key={key}>
            <HouseList data={this.state.list[index]} />
        </div>
    }
    onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        // if(!this.state.list.length){
        //     return;
        // }
        console.log(1213)
        let isBottom = scrollHeight - scrollTop - clientHeight < 5;
        let isMore = this.state.allNum > this.Prams.start;
        if(isBottom && isMore && this.isLoading){
            this.isLoading = false
            this.Prams.start += 20;
            this.Prams.end += 20;
            this.getList()
        }else{
            return
        }
    }
    submitFilter = (filterParams) => {
        console.log(filterParams)
        this.Prams.start = 1;
        this.Prams.end =  20;
        this.setState({ list:[]  });
        this.FilterParams = {...this.Prams,...filterParams}
        this.getList()
    }
    render() {
        return (<div className={indexCss.found}>
            {/* 头部 */}
            <div className={indexCss.nav}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    style={{ backgroundColor: "#eee" }}
                ></NavBar>
                <div className={indexCss.input_content}>
                    <Input />
                </div>
            </div>
            {/* 筛选组件 */}
            <FilterPanel submitFilter={this.submitFilter}/>
            {/* 房屋列表 */}
            <div className={indexCss.house_list}>
                <List
                    width={window.screen.width - 20}
                    height={window.screen.height - 135}
                    rowCount={this.state.list.length}
                    rowHeight={110}
                    rowRenderer={this.rowRenderer}
                    onScroll={this.onScroll}
                />
            </div>

        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        city: state.mapReducer.city.name
    }
}
export default connect(mapStateToProps)(Index);


