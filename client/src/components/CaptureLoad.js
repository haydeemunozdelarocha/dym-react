import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CaptureLoad extends Component {
  render() {
    return(
        <form action="/api/acarreos" method="POST" id="capturaForm" encType="application/x-www-form-urlencoded">
          <div className="form-group" id="camioninfo">
            <label htmlFor="camion_id">Camión ID</label>
            <input type="password" className="form-control" id="scanner" name="numero" onInput="getCamion()" required autoFocus autoComplete="off"/>
            <div id="search-status"></div>
            <input type="hidden" className="form-control" id="fletero" name="fletero"/>
            <input type="hidden" className="form-control" id="fletero_categoria" name="fletero_categoria"/>
            <input type="hidden" className="form-control" id="camion_id" name="camion_id"/>
            <input type="hidden" className="form-control" id="capacidad" name="capacidad"/>
            <input type="hidden" className="form-control" id="unidad" name="unidad"/>
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="categoria">Categoría Acarreo:</label>
              <select className="form-control" id="categoria" name="categoria" onChange="calcularFlete()" required disabled>
                <option value="">Categoría</option>
                <option value="82">Acarreo Interno</option>
                <option value="92">Acarreo Externo</option>
                <option value="100">Acarreo Material</option>
              </select>
            </div>
            <div id="banco-status"></div>
            <input type="hidden" className="form-control" id="concepto_flete" name="concepto_flete"/>
              <div id="bancoinfo" hidden>
                <br/>
                  <label htmlFor="bancoinfo">Banco:</label>
                  <select className="form-control" name="banco_id" id="banco" onChange="calcularAcarreoEM()" required disabled>
                    <option value="">Banco</option>
                  </select>
              </div>

              <div id="material-status"></div>
              <input type="hidden" className="form-control" id="proveedor_id" name="proveedor_id"/>
          </div>

          <input type="hidden" className="form-control" id="flete_id" name="flete_id"/>
          <input type="hidden" className="form-control" id="precio_flete" name="precio_flete"/>


          <div id="material-info" hidden>
            <label htmlFor="material">Material</label>
            <select className="form-control" name="material_id" id="material_id" onChange="getMaterial()" required disabled>
              <option value="">Material</option>
            </select>
            <br/>
          </div>

              <input type="hidden" className="form-control" id="precio_material" name="precio_material"/>
              <input type="hidden" className="form-control" id="concepto_material" name="concepto_material"/>


            <div className="form-group" name="zona" id="zona">
              <label htmlFor="zona">Zona</label>
              <select className="form-control" id="zonas" name="zona_id" required onChange="allowPhoto()" disabled>
                <option value="">Zonas</option>
              </select>
              <div id="zonas-status"></div>
            </div>

            <div id="photo-status"></div>

            <div className="form-group" name="submit" id="submit">
              <input type="submit" id="submit-button" className="btn btn-primary" disabled="disabled" value="Guardar"/>
            </div>
        </form>
      )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(CaptureLoad));