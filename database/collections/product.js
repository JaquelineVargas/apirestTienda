//TABLA DE PRODUCTO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require('../connect');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  name: {
      type: String,
      required: [true, 'debe poner un nombre'],
      match: /^[a-z]{3,16}$/,
  },
  precio: {
        type: Number,
        require:'Producto debe tener un precio'
  },
  categoria:{
      required:['no hay categoria'],
      type: String,
      enum:['electrodomesticos','prendas','herramientas','muebles','vehiculos','varios'],
  },
  cantidad:{
      type:Number,
      default:0,
  },
  estado:{
        type: String,
        default: 'agotado',
        enum:['disponible','no disponible','agotado'],
  },
  description: String,
  image: String,
  registerdate : {
        type: Date,
        default: Date.now()
  },
  iduser: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:'Falta info del vendedor'
    },
});
var product = mongoose.model("product", ProductSchema);
module.exports = product;
