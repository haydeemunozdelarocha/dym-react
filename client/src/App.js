import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/Register';
import CaptureLoad from './components/CaptureLoad';
import Login from './components/Login';
import Home from './components/Home';
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import {logoutUser, setCurrentUser} from "./actions/authentication";
import Navigation from "./components/Navigation";

import 'foundation-sites';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  componentDidMount() {
    $(document).foundation();
  }

  render() {
    return (
        <Provider store = { store }>
          <Router>
            <div>
              <Navigation/>
              <Route exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/capture" component={ CaptureLoad } />
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
