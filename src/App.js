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
function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/home" component={Home}></Route>
          <Route exact  path="/" exact>
            <Redirect to="/home" ></Redirect> 
          </Route>
          <Route path="/mapFound" component={MapFound} exact></Route>
          <Route path="/citySelect" component={CitySelect} exact></Route>
          <Route path='/index' component={Index}></Route>
      </Router>
    </div>
  );
}
export default App;
