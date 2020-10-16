import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { getLocalCityAction } from './store/actionCreator'
import { connect } from 'react-redux'
import MyList from './component/demo/index'
import Test from './pages/test'
const MapFound = lazy(() => import('./pages/mapFound'))
const Index = lazy(() => import('./pages/index'))
const CitySelect = lazy(() => import('./pages/citySelect'))
const Home = lazy(() => import('./pages/home'))
const Loading = () => <div></div>
class App extends React.Component {
  componentDidMount() {
    this.props.initCity()
  }
  render() {
    return (
      <div className="home">
        {this.props.cityName &&
          <Suspense fallback={<Loading/>}>
            <Router>
              <Route path="/home" component={Home}></Route>
              <Route exact path="/">
                <Redirect to="/home" ></Redirect>
              </Route>
              <Route path="/mapFound" component={MapFound} exact></Route>
              <Route path="/citySelect" component={CitySelect} exact></Route>
              <Route path='/index' component={Index}></Route>
              <Route path='/mylist' component={MyList}></Route>
              <Route path="/test" component={Test}></Route>
            </Router>
          </Suspense>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cityName: state.mapReducer.city.name
})
const mapDispathToProps = (dispatch) => {
  return {
    initCity() {
      dispatch(getLocalCityAction())
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(App);
