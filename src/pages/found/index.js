import React, { Component } from 'react';
import { connect } from "react-redux"
import { NavBar, Icon, Toast } from 'antd-mobile';
import indexCss from './index.module.scss'
import Input from '../../component/CityInput'
import FilterPanel from '../../component/filterPanel'
import axios from "../../utils/axios"
import HouseList from '../../component/houseList'
import { List } from 'react-virtualized'
class Index extends Component {
    Prams = {
        cityId: '',
        start: 3,
        end: 20
    }
    FilterParams = {}
    state = {
        list: [],
        allNum: 0,
        nomore:false
    }
    isLoading = true
    async componentDidMount() {
        const res = await axios.get('/area/info?name=' + this.props.city)
        this.Prams.cityId = res.data.body.value
        this.getList()
    }
    getList = async () => {
        const res = await axios.get('/houses', { params: {...this.FilterParams,...this.Prams} })
        this.setState({
            list: [...this.state.list,...res.data.body.list],
            allNum: res.data.body.count
        })
        if(res.data.body.list.length === 0){
            this.setState({ nomore: true})
        }else if(this.state.nomore){
            this.setState({ nomore: false})
        }
        this.isLoading = true;
        Toast.info(`共找到${res.data.body.count}套房子`, 2);
        // console.log(res)
    }
    rowRenderer = ({ index, style, key }) => {
        return <div style={style} key={key}>
            <HouseList data={this.state.list[index]} />
        </div>
    }
    onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        if(!this.state.list.length){
            return;
        }
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
        this.filterParams = filterParams;
        this.getList()
    }
    render() {
        const {nomore} = this.state
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
            {/* 没有数据提示 */}
           {nomore &&  <div className={indexCss.nomore}>
               <img src="http://157.122.54.189:9060/img/not-found.png" alt=""/>
               <p>没有找到房源，请您换个搜索条件吧~</p>
            </div>}
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        city: state.mapReducer.city.name
    }
}
export default connect(mapStateToProps)(Index);


