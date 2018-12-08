const moment = require('moment-timezone');
const db = require('../../db.js');

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else{
    res.redirect('/login');
  }
};

router.post('/', isLoggedIn, function(req,res, next){
  console.log(req.body);
  let recibo;
  let usuario_id = req.user.id_usuario;
  let obra_id = req.user.obra_id;
  let camion_id= Number(req.body.camion_id);
  let foto = req.body.photo;
  let unidad = req.body.unidad;
  if (!foto){
    foto = null;
  }
  var categoria_flete = req.body.fletero_categoria;
  var total_flete = req.body.precio_flete;
  var zona_id = Number(req.body.zona_id);
  var cantidad=req.body.capacidad;
  var date = Date.now();
  var timezone = "America/Mexico_City";
  var hora= moment.tz(date,timezone).format("YYYY-MM-DD hh:mm A");
  console.log(hora)
  var flete_id = req.body.flete_id;
  var banco_id = req.body.banco_id;
  var concepto_flete = Number(req.body.concepto_flete);

  if(concepto_flete == 92) {
    var material_id= concepto_flete;
    var total_material = (Number(req.body.precio_material)*cantidad);
    var concepto_material = req.body.concepto_material;
  } else if(concepto_flete == 82) {
    banco_id = null;
  } else {
    var material_id= Number(req.body.material_id);
    var total_material = (Number(req.body.precio_material));
    var concepto_material = req.body.concepto_material;
  }
  var nuevoRecibo = "INSERT INTO recibos(usuario_id,zona_id,foto,hora,obra_id,camion_id) VALUES (?,?,?,?,?,?);";
  db.query(nuevoRecibo,[usuario_id,zona_id,foto,hora,obra_id,camion_id], function(err, rows){
    console.log(usuario_id,zona_id,foto,hora,obra_id,camion_id)
    console.log(nuevoRecibo)
    if(err) {
      res.render('error',{message: 'Hubo un error al capturar el acarreo.' })
    }
    else {
      recibo=rows.insertId;
      if(concepto_flete == 92){
        console.log('externo')
        var nuevoAcarreo = 'INSERT INTO acarreos_flete(cantidad,total_flete,recibo_id,concepto_flete,flete_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);INSERT INTO acarreos_material(material_id,cantidad,total_material,concepto_material,recibo_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);'
        var values = [cantidad,total_flete,recibo,concepto_flete,flete_id,banco_id,unidad,material_id,cantidad,total_material,concepto_material,recibo,banco_id,unidad];
      } else if (concepto_flete == 82){
        console.log('interno')
        var nuevoAcarreo = 'INSERT INTO acarreos_flete(cantidad,total_flete,recibo_id,concepto_flete,flete_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);'
        var values = [cantidad,total_flete,recibo,concepto_flete,flete_id,banco_id,unidad];
      } else {
        if(categoria_flete === 'flete/banco'){
          console.log('flete banco')
          var nuevoAcarreo = 'INSERT INTO acarreos_material(material_id,cantidad,total_material,concepto_material,recibo_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);'
          var values = [material_id,cantidad,total_material,concepto_material,recibo,banco_id,unidad];
        } else {
          var nuevoAcarreo = 'INSERT INTO acarreos_flete(cantidad,total_flete,recibo_id,concepto_flete,flete_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);INSERT INTO acarreos_material(material_id,cantidad,total_material,concepto_material,recibo_id,banco_id,unidad) VALUE (?,?,?,?,?,?,?);'
          var values = [cantidad,total_flete,recibo,concepto_flete,flete_id,banco_id,unidad,material_id,cantidad,total_material,concepto_material,recibo,banco_id,unidad];
        }
      }
      console.log(values);
      db.query(nuevoAcarreo,values,function(err, rows) {
        if(err){
          res.render('error',{message: 'Hubo un error al capturar el acarreo.' })

        }
        else {
          res.redirect('/captura')
        }
      });
    }
  });
})