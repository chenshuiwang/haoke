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

        ],
        selectValues: [
            [],
            [],
            [],
            []
        ],
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
                label: '户型',
                children: condition.roomType
            },
            {
                label: '朝阳',
                children: condition.oriented
            },
            {
                label: '楼层',
                children: condition.floor
            },
            {
                label: '房屋亮点',
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
    pickerChange = (values) => {
        let {selectValues,currentIndex} = this.state;
        selectValues[currentIndex] = values;
        this.setState({ selectValues  });
        // console.log(selectValues[2])
    }
    clickFilterItem = (value) => {
        let {selectValues,currentIndex} = this.state;
        const index = selectValues[currentIndex].findIndex(v => v===value)
        if(index === -1){
            selectValues[currentIndex].push(value)
        }else{
            selectValues[currentIndex].splice(index,1)
        }
        this.setState({ selectValues });
    }
    submitFilter = () => {
        let {selectValues} = this.state;
        const areaSubwayName = selectValues[0][0];
        const areaSubwayValue = selectValues[0][2] === "null" ? selectValues[0][1] : selectValues[0][2];
        const rentType = selectValues[1][0];
        const price = selectValues[2][0];
        const more = selectValues[3].join(',')
        const submitParams = {
            [areaSubwayName]:areaSubwayValue,
            rentType,
            price,
            more
        }
        for(const key in submitParams){
            if(["null",undefined,''].includes(submitParams[key])){
                delete submitParams[key]
            }
        }
        this.setState({
            currentIndex: -1
        })
        this.props.submitFilter(submitParams)
    }
    rowRender() {
        const { filterList, filterTitle, currentIndex, selectValues } = this.state;
        if ([0, 1, 2].includes(currentIndex)) {
            return <div className={indexCss.picker_content}>
                <PickerView
                    data={filterList[currentIndex]}
                    cols={filterTitle[currentIndex].cols}
                    onChange={this.pickerChange}
                    value={selectValues[currentIndex]}
                />
                <div className={indexCss.btns}>
                    <div className={indexCss.btns_cancel} onClick={this.filterCancel}>取消</div>
                    <div className={indexCss.btns_item} onClick={this.submitFilter}>确定</div>
                </div>
            </div>
        } else if (currentIndex === 3) {
            return <div className={indexCss.other_content}>
                <SliderBar>
                    <div className={indexCss.other_filter_main}>
                        {filterList[3].map((v, i) => <div className={indexCss.slider_item} key={i}>
                            <div className={indexCss.slider_item_title}>{v.label}</div>
                            <div className={indexCss.slider_item_child}>
                                {v.children.map((vv, ii) => <span 
                                                                key={ii} 
                                                                onClick={this.clickFilterItem.bind(this,vv.value)}
                                                                className={selectValues[currentIndex].includes(vv.value) ? indexCss.active : ''}>{vv.label}</span>)}
                            </div>
                        </div>)}
                        <div className={indexCss.btns}>
                            <div className={indexCss.btns_cancel} onClick={this.filterCancel}>清除</div>
                            <div className={indexCss.btns_item} onClick={this.submitFilter}>确定</div>
                        </div>
                    </div>
                </SliderBar>
            </div>
        } else {
            return <></>
        }
    }
    render() {
        const { filterTitle, currentIndex } = this.state;
        return (<div className={indexCss.filter_panel}>
            <div className={
                [
                    indexCss.filter_main,
                    [0,1,2].includes(currentIndex) ? indexCss.top_mask : ''
                ].join(' ')}>
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
            </div>
            {/* 遮罩层 */}
            <div className={indexCss.mask} hidden={currentIndex === -1} onClick={this.filterCancel}></div>
        </div>);
    }
}

export default Index;