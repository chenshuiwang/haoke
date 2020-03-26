import React, { Component } from 'react';
import indexCss from './index.module.scss'
class Index extends Component {
    render() {
        return (<div className={indexCss.personal}>
            <img src="http://157.122.54.189:9060/img/profile/bg.png" alt=""/>
            {/* 卡片 */}
            <div className={indexCss.card}>
                <div className={indexCss.logo}>
                    <img src="http://157.122.54.189:9060/img/profile/avatar.png" alt=""></img>
                </div>
                <div className={indexCss.content}>
                    <span>游客</span>
                    <button type="">去登陆</button>
                </div>
            </div>
            {/* 菜单栏 */}
            <div className={indexCss.menu}>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-coll"></i>
                    <span>我的收藏</span>
                </div>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-ind"></i>
                    <span>我的出租</span>
                </div>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-record"></i>
                    <span>看房记录</span>
                </div>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-identity"></i>
                    <span>成为房主</span>
                </div>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-myinfo"></i>
                    <span>个人资料</span>
                </div>
                <div className={indexCss.menu_item}>
                    <i className="iconfont icon-cust"></i>
                    <span>联系我们</span>
                </div>
            </div>
            {/* 底部图片 */}
            <div className={indexCss.pic}>
                <img src="http://157.122.54.189:9060/img/profile/join.png" alt=""/>
            </div>
        </div>);
    }
}

export default Index;