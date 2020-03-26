import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import indexCss from './index.module.scss'
import { connect } from "react-redux"
import axios, { baseURL } from '../../utils/axios'
const BMap = window.BMap
var map;
class App extends Component {
    state = {
        houseList: [],
        showList: false
    }
    ZoomFunc = (function () {
        let arr = [
            {
                level: 0,
                zoom: 10,
                cls: "circle"
            },
            {
                level: 1,
                zoom: 12,
                cls: "circle"
            },
            {
                level: 2,
                zoom: 15,
                cls: "rect"
            }
        ]
        let index = -1;
        return () => {
            index++;
            return arr[index]
        }
    })()
    async componentDidMount() {
        const { city } = this.props
        map = new BMap.Map("container");
        // 创建地图实例
        const id = (await axios.get(baseURL + "/area/info?name=" + city)).data.body.value;
        this.drawHouse(id, city)
        this.getHouses("AREA|fb913345-4416-6228")
    }
    drawHouse = async (id, position) => {
        const zoomObj = this.ZoomFunc();
        map.centerAndZoom(position, zoomObj.zoom);
        // 添加缩放控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addEventListener('dragstart', () => {
            this.setState({
                showList: false
            })
        })
        const list = (await axios.get(baseURL + '/area/map?id=' + id)).data.body
        list.forEach(v => {
            var point = new BMap.Point(v.coord.longitude, v.coord.latitude)
            var opts = {
                position: point,    // 指定文本标注所在的地理位置
            }
            var label = new BMap.Label(`<div class=${indexCss[zoomObj.cls]}><span>${v.label}</span><span>${v.count}套</span></div>`, opts);  // 创建文本标注对象
            label.setStyle({
                backgroundColor: 'transport',
                border: 'none'
            });
            label.addEventListener("click", () => {
                if (zoomObj.level < 2) {
                    this.drawHouse(v.value, point);
                    setTimeout(() => {
                        map.clearOverlays();
                    }, 0)
                } else {
                    this.setState({
                        showList: true
                    })
                }
            })
            map.addOverlay(label);
        })
    }
    getHouses = async (cityId) => {
        let res = await axios.get(baseURL + '/houses?cityId=' + cityId)
        this.setState({
            houseList: res.data.body.list
        })
    }
    render() {
        return (<div className={indexCss.map_found}>
            {/* 头部 */}
            <div className={indexCss.nav}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >地图找房</NavBar>
            </div>
            {/* 地图 */}
            <div className={indexCss.map}>
                <div className={indexCss.container} id="container">25252</div>
            </div>
            {/* 租房列表 */}
            {this.state.showList && <div className={indexCss.house_list} >
                <div className={indexCss.list_title}>
                    <span>房屋列表</span>
                    <span>更多房源</span>
                </div>
                {this.state.houseList.map((v, i) => <div key={i} className={indexCss.list_content}>
                    <div className={indexCss.list_item} >
                        <div className={indexCss.house_img}>
                            <img src={baseURL + v.houseImg} alt="" />
                        </div>
                        <div className={indexCss.house_desc}>
                            <div className={indexCss.title}>{v.title}</div>
                            <div className={indexCss.introduce}>{v.desc}</div>
                            <div className={indexCss.tags}>
                                {v.tags.map(vv => <span key={vv}>{vv}</span>)}
                            </div>
                            <div className={indexCss.price}>
                                <span>{v.price}</span>元/月
                        </div>
                        </div>
                    </div>
                </div>)}
            </div>}
        </div>);
    }
}
const mapStateToprops = (state) => {
    return {
        city: state.mapReducer.city.name
    }
}
export default connect(mapStateToprops)(App);