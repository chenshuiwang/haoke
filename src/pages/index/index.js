import React, { Component } from 'react';
import axios,{baseURL} from '../../utils/axios'
import { Carousel } from 'antd-mobile';
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import indexCss from './index.module.scss'
import Search from '../../component/CityInput'
class Index extends Component {
  state = {
    data: [],
    imgHeight: 176,
    navs:[
        { id: 0,text: '整租', pic: nav1},
        { id: 1,text: '合租', pic: nav2},
        { id: 2,text: '地图找房', pic: nav3},
        { id: 3,text: '去出租', pic: nav4},
    ],
    group:[],
    news:[]
  }
  async componentDidMount() {
    this.getCarousel();
    this.getGroups();
    this.getNews(); 
  }
  async getCarousel(){
    const res = await axios.get(baseURL + '/home/swiper');
    this.setState({
        data:res.data.body
    })
  }
  async getGroups(){
    const res = await axios.get(baseURL + '/home/groups')
    this.setState({
        group: res.data.body
    })
  }
  async getNews(){
    const res = await axios.get(baseURL + '/home/news')
    this.setState({
        news: res.data.body
    })
  }
  render() {
    return (<div className={indexCss.hk_index}>
        {/* 搜索框 */}
        <div className={indexCss.search}>
          <Search/>
        </div>
        {/* 轮播图 */}
        {this.state.data.length && <Carousel
          autoplay
          infinite
          style={{backgroundColor:'#fff'}}
        >
          {this.state.data.map(val => (
            <a
              key={val.id}
              href="#"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={baseURL + val.imgSrc}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 212 });
                }}
              />
            </a>
          ))}
        </Carousel>}
        {/* 导航模块 */}
        <div className={indexCss.nav_content}>
            {this.state.navs.map(v => <div className={indexCss.nav_item} key={v.id}>
                <div className={indexCss.pic}>
                    <img src={v.pic} alt=""/>
                </div>
            <span>{v.text}</span>
            </div>)}
        </div>
        {/* 租房小组 */}
        <div className={indexCss.group}>
            <div className={indexCss.group_title}>
                <h4>租房小组</h4>
                <span>更多</span>
            </div>
            <div className={indexCss.group_list}>
                {this.state.group.map(v => 
                    <div className={indexCss.group_item} key={v.id}>
                        <div className={indexCss.group_item_text}>
                            <h4>{v.title}</h4>
                            <span>{v.desc}</span>
                        </div>
                        <div className={indexCss.pic}>
                            <img src={baseURL + v.imgSrc} alt=""/>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {/* 最新资讯 */}
        <div className={indexCss.news}>
            <div className={indexCss.news_title}>
                <h4>最新资讯</h4>
            </div>
            <div className={indexCss.news_list}>
                {this.state.news.map(v => <div className={indexCss.news_item} key={v.id}>
                    <div className={indexCss.pic}>
                        <img src={baseURL + v.imgSrc} alt=""/>
                    </div>
                    <div className={indexCss.item_text}>
                        <div className={indexCss.title}>
                            <h3>{v.title}</h3>
                        </div>
                        <div className={indexCss.desc}>
                            <span>{v.from}</span>
                            <span>{v.date}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>);
  }
}

export default Index; 