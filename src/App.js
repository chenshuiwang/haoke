import React from 'react';
import TabBarExample from './component/TarBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <TabBarExample></TabBarExample> */}
      <Router>
        <nav>
          <Link to='/'>首页</Link>
          <Link to='/found'>找房</Link>
          <Link to='/infom'>资讯</Link>
          <Link to='/my'>我的</Link>
        </nav>
        <section>
          <Route path="/" component={Btn} exact></Route>
          <Route path="/found" component={Btn} exact></Route>
          <Route path="/infom" component={Btn} exact></Route>
          <Route path="/my" component={Btn} exact></Route>
        </section>
      </Router>
    </div>
  );
}
const Btn =() => <h1>213</h1>
export default App;
