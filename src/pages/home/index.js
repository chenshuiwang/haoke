import { TabBar } from 'antd-mobile';
import React,{lazy,Suspense} from 'react'
import { Route } from "react-router-dom";
const Index = lazy(() => import("../index/index"))
const Found = lazy(() => import("../found"))
const News = lazy(() => import("../news"))
const My = lazy(() => import("../my"))
const Loading = () => <div></div>
class Home extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.location.pathname === '/home'){
        this.props.history.push("/home/index")
    }
  }

  render() {
    const {pathname} = this.props.location;
    const {history} = this.props;
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="rgb(33, 185, 122)"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={pathname === '/home/index'}
            onPress={() => history.push('/home/index')}
            data-seed="logId"
          >
            <Suspense fallback={<Loading/>}>
              <Route path="/home/index" component={Index}></Route>
            </Suspense>
          </TabBar.Item>
          
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse"></i>}
            selectedIcon={<i className="iconfont icon-findHouse"></i>}
            title="找房"
            key="Find"
            selected={pathname === '/home/found'}
            onPress={() => history.push('/home/found')}
            data-seed="logId1"
          >
            <Route path="/home/found" component={Found}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-infom"></i>}
            selectedIcon={<i className="iconfont icon-infom"></i>}
            title="资讯"
            key="Infom"
            selected={pathname === '/home/news'}
            onPress={() => history.push('/home/news')}
          >
            <Route path="/home/news" component={News}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my"></i>}
            selectedIcon={<i className="iconfont icon-my"></i>}
            title="我的"
            key="my"
            selected={pathname === '/home/my'}
            onPress={() => history.push('/home/my')}
          >
            <Route path="/home/my" component={My}></Route>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
// ReactDOM.render(<TabBarExample />, mountNode);
export default Home