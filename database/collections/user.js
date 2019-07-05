//TABLA DE USUARIO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require("../connect");
var userSchema = {
  name : String,
  address: String,
  email : String,
  password: String,
  phone :String,
  type :String,
  registerdate : Date
};
var user = mongoose.model("user", userSchema);
module.exports = user;
