import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import Home from './pages/home'
import MapFound from './pages/mapFound'
import CitySelect from './pages/citySelect'
import Index from './pages/index'
import {getLocalCityAction} from './store/actionCreator'
import {connect} from 'react-redux'
import MyList from './component/demo/index'
class App extends React.Component {
  componentDidMount() {
    this.props.initCity()
  }
  render() { 
    return (
      <div className="App">
        {this.props.cityName&&
        <Router>
            <Route path="/home" component={Home}></Route>
            <Route exact  path="/" exact>
              <Redirect to="/home" ></Redirect> 
            </Route>
            <Route path="/mapFound" component={MapFound} exact></Route>
            <Route path="/citySelect" component={CitySelect} exact></Route>
            <Route path='/index' component={Index}></Route>
            <Route path='/mylist' component={MyList}></Route>
        </Router>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cityName: state.mapReducer.city.name
})
const mapDispathToProps = (dispatch) => {
  return {
    initCity(){
      dispatch(getLocalCityAction())
    }
  }
}
export default connect(mapStateToProps,mapDispathToProps)(App);
