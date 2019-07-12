//TABLA DE PRODUCTO
//SE ESTA ENLAZANDO CON FILE connect
const mongoose = require('../connect');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    category: String,
    description: String,
    cantidad : Number,
    log:String,
    lat:String,
    registerDate: Date,
    iduser : String
});
var product = mongoose.model("product", ProductSchema);
module.exports = product;
