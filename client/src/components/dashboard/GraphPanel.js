import React, {Component} from "react";

class TablePanel extends Component {
  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">Presupuestado vs Actual</div>
          <div className="panel-body">
            <canvas id="myChart"></canvas>
          </div>
        </div>
    )
  }
}

export default TablePanel;