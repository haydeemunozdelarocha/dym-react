import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
// import {logoutUser} from "../actions/authentication";
// import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Dashboard from "./dashboard/Dashboard";

class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  render() {
    console.log('home');
    return(
      <div className="main-container">
        <Dashboard/>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);