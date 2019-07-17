//TABLA DE USUARIO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require("../connect");
var userSchema = {
  name: String,
  address: String,
  password: {
        type: String,
        required: ['Contraseña necesaria'],
  },
  email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  type: {
      type:String,
      enum:['Comprador', 'Vendedor']
  },
  phone :String,
  lat : String,
  log : String,
  registerdate : {
        type: Date,
        default: Date.now()
    },
  like: {
      type:Number,
      default:0,
    },
  dislike:{
      type:Number,
      default:0,
    },
};
var user = mongoose.model("user", userSchema);
module.exports = user;
