import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from "react-redux";
import axios,{baseURL} from '../../utils/axios'
import indexCss from './index.module.scss'
class App extends Component {
    state  = {
        hotCity:[],
        allCity:[],
        finalList:[]
    }
    componentDidMount() {
        this.getCurrentCity();
        this.getHotCity();
        this.getAllCity();
        console.log(this.props.cityName)
    }
    getCurrentCity(){
        this.state.finalList.push({
            name:'当前定位',
            value:[this.props.cityName]
        })
        console.log(this.state.finalList)
        this.setState({
            finalList:this.state.finalList
        })
    }
    async getHotCity(){
        let res = await axios.get(baseURL + '/area/hot')
        this.state.finalList.push({
            name:'热门城市',
            value:res.data.body.map(v => v.label)
        })
    }
    async getAllCity(){
        let res = await axios.get(baseURL + "/area/city?level=1")
        this.setState({
            allCity:res.data.body
        })
        let arr = this.state.allCity.sort((a,b) =>a.short>b.short?1:-1);
        arr.forEach(v => {
            const first = v.short[0].toUpperCase();
            const index = this.state.finalList.findIndex(vv => vv.name === first);
            if(index === -1){
                this.state.finalList.push({
                    name:first,
                    value:[v.label]
                })
            }else{
                this.state.finalList[index].value.push(v.label)
            }
        })
        this.setState({
            finalList:this.state.finalList
        })
    }
    render() {
        return (<div className='citySelect'>
            {/* 头部 */}
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
            >选择城市</NavBar>
            {/* 城市列表 */}
            <div className={indexCss.cityList}>
                {this.state.finalList.map((v,i) => <div key={i}>
                    <div className={indexCss.city_item} key={v}>
                        <div className={indexCss.city_title}>{v.name}</div>
                        {v.value.map(vv => <div className={indexCss.city_name} key={vv}>{vv}</div>)}
                    </div>
                </div>
                    
                )}
            </div>
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.mapReducer.city.name
    }
}
export default connect(mapStateToProps)(App);