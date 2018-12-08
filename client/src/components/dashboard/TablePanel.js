import React, {Component} from "react";

class TablePanel extends Component {
  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">Costos (Por Obra)</div>
          <div className="panel-body">
            <table className="table table-striped">
              <tr>
                <td>Obra</td>
                <td>Presupuestado</td>
                <td>Acumulado</td>
                <td>Por Ejercer</td>
              </tr>
            </table>
          </div>
        </div>
    )
  }
}

export default (TablePanel);