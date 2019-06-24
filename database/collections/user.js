//TABLA DE USUARIO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require("../connect");
var userSchema = {
  name : String,
  ci: String,
  address: String,
  password: String,
  email : String,
  type :String,
  phone :String,
//  registerdate : Date,
};
var user = mongoose.model("user", userSchema);
module.exports = user;
