var express = require('express');
var router = express.Router();
var _ = require("underscore");
var User = require("../../../database/collections/user");
var jwt =require("jsonwebtoken");


//loginprin
/*router.post("/login",async(req,res,next) => {
  var params =req.body;
  if(!valid.checkParams({"email": String,"password":String},params)){
    res.status(300).json({"msn":"Error parametros incorrectos"});
    return;
  }
  var haspassword =sha1(params.password);
  var docs =await USER.find({email:params.email,password: haspassword});
  if (docs.length==0){
    res.status(300).json({"msn":"Error usurio no registrado"});
    return;
  }
  if (docs.length == 1){
    jwt.sign({name: params.email,password: haspassword},"password",(err,token) => {
      if (err){
        res.status(300).json({"msn":"Error del jwt"});
        return;
      }
      res.status(200).json({"token": token});
    });
    return;
  }
});*/

//login
router.post("/login", (req, res, next) => {
  var email= req.body.email;
  var password = req.body.password;
  var result = User.findOne({email: email,password: password}).exec((err, doc) => {
    if (err) {
      res.status(200).json({
        msn : "No se puede concretar con la peticion "
      });
      return;
    }
    if (doc) {
      //res.status(200).json(doc);
      jwt.sign({email: doc.email, password: doc.password}, "secretkey123", (err, token) => {
          console.log(err);
          res.status(200).json({
            token : token
          });
      })
    } else {
      res.status(200).json({
        msn : "El usuario no existe ne la base de datos"
      });
    }
  });
});
//Middelware
function verifytoken (req, res, next) {
  //Recuperar el header
  const header = req.headers["authorization"];
  if (header  == undefined) {
      res.status(403).json({
        msn: "No autotizado"
      })
  } else {
      req.token = header.split(" ")[1];
      jwt.verify(req.token, "secretkey123", (err, authData) => {
        if (err) {
          res.status(403).json({
            msn: "No autotiz"
          })
        } else {
          next();
        }
      });
  }
}


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
router.get("/user",verifytoken, (req,res,next) => {
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

//PATH actualizar algunos campos de usuarios
router.patch(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user ={};
  for (var i=0;i<keys.length;i++){
    user[keys[i]]= req.body[keys[i]];
  }
  var user = {
    name : req.body.name,
    ci: req.body.ci,
    address: req.body.address,
    password: req.body.password,
    email : req.body.email,
    phone :req.body.phone
    //registerdate : req.body.registerDate,
  };
User.findOneAndUpdate({_id: id},user,(error,params) => {
    if(error){
      res.status(500).json({
        "msn": "error nose pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
});
});

//Actualizar todos los campos de usuarios
router.put(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkeys = ['name','ci','address','password','email','type','phone'];
  var result = _.difference(oficialkeys,keys);
  if (result.length > 0){
    res.status(400).json({
      "msn" : "exite error en el formato de envio "
    });
    return;
  }
  var user = {
    name : req.body.name,
    ci: req.body.ci,
    address: req.body.address,
    password: req.body.password,
    email : req.body.email,
    phone :req.body.phone,
    //registerdate : req.body.registerDate,
  };
User.findOneAndUpdate({_id: id},user,(error,params) => {
    if(error){
      res.status(500).json({
        "msn": "error nose pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
});
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
