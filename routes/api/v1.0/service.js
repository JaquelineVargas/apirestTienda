var express = require('express');
var router = express.Router();
var User = require("../../../database/collections/user");


//CRUD que es Create,Read, Update, Delete
//creacion de usuarios
router.post("/user",(req,res) => {
//validacion
if(req.body.name ==""&& req.body.email == "" ){
  res.status(400).json({"msn" : "formato incorrecto"});
  return;
}
var user = {
  name : req.body.name,
  ci: req.body.ci,
  address: req.body.address,
  password: req.body.password,
  email : req.body.email,
  type :req.body.type,
  phone :req.body.phone,
  //registerdate : req.body.registerDate,
};
var userData = new User(user);

userData.save().then( () => {
  res.status(200).json({
    "msn" : "usuario Registrado con exito"
  });
});
});

//Lectura de todos los usuarios
router.get("/user",(req,res,next) => {
 User.find({}).exec((error,docs) => {
  res.status(200).json(docs);
 })
});

//lectura de usuarios por id
router.get(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec((error,docs) => {
    if(docs != null){
      res.status(200).json(docs);
      return;
    }
    res.status(200).json({
      "msn" :"no existe el usuario"
    });
  })
});
//eliminar usuarios
router.delete(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec((error,docs) => {
    res.status(200).json(docs);
  })
});







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
