import React, { Component } from "react";
import GraphPanel from './GraphPanel';
import TablePanel from './TablePanel';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <GraphPanel />
        <TablePanel />
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);