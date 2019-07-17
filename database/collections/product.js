//TABLA DE PRODUCTO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require('../connect');
var Schema = mongoose.Schema;
var productSchema = Schema({
  user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
  name: String,
  description: String,
  categoria:{
      required:['no hay categoria'],
      type: String,
      enum:['electrodomesticos','prendas','herramientas','muebles','vehiculos','varios'],
  },
  cantidad:{
      type:Number,
      default:0,
  },
  precio: {
        type: Number,
        require:'Producto debe tener un precio'
  },
  estado:{
        type: String,
        default: 'agotado',
        enum:['disponible','no disponible','agotado'],
  },
  registerdate : {
        type: Date,
        default: Date.now()
  },
  foto: String,

});
var product = mongoose.model("Product", ProductSchema);
module.exports = product;
