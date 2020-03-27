import React, { Component } from 'react';
import indexCss from './index.module.scss'
import { PickerView } from 'antd-mobile';
import axios from '../../utils/axios'
import SliderBar from '../../component/sliderBar'
class Index extends Component {
    state = {
        filterTitle: [
            {
                text: "区域",
                id: 0,
                cols: 3
            },
            {
                text: "方式",
                id: 1,
                cols: 1
            },
            {
                text: "租金",
                id: 2,
                cols: 1
            },
            {
                text: "筛选",
                id: 3,
                cols: -1
            }
        ],
        currentIndex: -1,
        filterList: [
            [],
            [],
            [],
            
        ]
    }
    async componentDidMount() {
        const { city } = this.props;
        const { filterList } = this.state;
        const id = (await axios.get("/area/info?name=" + city)).data.body.value;
        const condition = (await axios.get("/houses/condition?id=" + id)).data.body;
        filterList[0] = [condition.area, condition.subway];
        filterList[1] = condition.rentType;
        filterList[2] = condition.price;
        filterList[3] = [
            {
                label:'户型',
                children: condition.roomType
            },
            {
                label:'朝阳',
                children: condition.oriented
            },
            {
                label:'楼层',
                children: condition.floor 
            },
            {
                label:'房屋亮点',
                children: condition.characteristic
            }
        ]
        // [condition.roomType,condition.oriented,condition.floor,condition.characteristic]
        this.setState({
            filterList
        })
    }
    titleClick = (currentIndex) => {
        this.setState({ currentIndex });
    }
    filterCancel = () => {
        this.setState({ currentIndex: -1 });
    }
    rowRender() {
        const { filterList, filterTitle,currentIndex } = this.state;
        if ([0,1,2].includes(currentIndex)) {
            return <>
            <PickerView
                data={filterList[currentIndex]}
                cols={filterTitle[currentIndex].cols}
            />
            <div className={indexCss.btns}>
                <div className={indexCss.btns_cancel} onClick={this.filterCancel}>取消</div>
                <div className={indexCss.btns_item}>确定</div>
            </div>
        </>
        } else if (currentIndex === 3) {
            return <SliderBar data={filterList[3]}></SliderBar>
        }else{
            return <></>
        }
    }
    render() {
        const { filterTitle, currentIndex } = this.state;

        return (<div className={indexCss.filter_panel}>
            {/* 标题 */}
            <div className={indexCss.filter_title}>
                {filterTitle.map((v, i) => <div
                    className={
                        [
                            indexCss.filter_title_item,
                            i === currentIndex ? indexCss.active : ''
                        ].join(' ')}
                    key={v.id}
                    onClick={this.titleClick.bind(this, v.id)}>{v.text}</div>)}
            </div>
            {/* 选择器 */}
            <div className={indexCss.picker}>
                {this.rowRender()}
            </div>
        </div>);
    }
}

export default Index;