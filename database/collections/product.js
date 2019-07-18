//TABLA DE PRODUCTO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require('../connect');
var Schema = mongoose.Schema;
var productSchema = Schema({
  vendedor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
  name: String,
  description: String,
  category:{
      required:['no hay categoria'],
      type: String,

  },
  cantidad:{
      type:Number,
      default:0,
  },
  price: {
        type: Number,
        require:'Producto debe tener un precio'
  },
  estado:{
        type: String,
        default: 'agotado',
  },
  registerdate : {
        type: Date,
        default: Date.now()
  },
  image: String

});
var product = mongoose.model("Product", productSchema);
module.exports = product;
