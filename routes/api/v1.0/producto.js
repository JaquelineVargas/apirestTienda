// need router with app.js
var express = require('express');
var multer = require ('multer');
var path = require ('path');
var router = express.Router();
var _ = require("underscore");
var  Product = require("../../../database/collections/product");
var jwt =require("jsonwebtoken");

//USO DE MULTER SE ALMACENAN LAS IMAGENES EN IMAGES
var storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    //nombres de imagenes guardado por fecha
    cb(null, "IMG_" + Date.now() + path.extname(file.originalname));
  }
});
var fileFilter = (req,file,cb)=>{

}
var upload = multer({
  storage: storage,
  dest :path.join(),
  fileFilter
}).single("img");


//CRUD DE IMAGENES
//SUBIR IMAGEN A UN PRODUCTO  POST
router.post("/uploadproduct", (req,res)=>{
  var params = req.query;
  var id =params.id;
  Product.findOne({_id: id}).exec((err,docs)=> {
    if(err){
      res.status(501).json({
        "msn" : "Problemas con la base de datos"
      });
      return;
    }

    if (docs != undefined) {
      upload(req, res, (err) => {
        if(err){
          res.status(500).json({
            "msn": "Error al subir la imagen"
          });
          return;
        }
        var url = req.file.path.replace(/public/g, "");
        //ASIGNAR IMAGEN EN ATRIBUTO IMAGE
        Product.update({_id: id},{$set:{image:url}},(err, docs) => {
          if (err){
            res.status(200).json({
              "msn": err
            });
            return;
          }
          res.status(200).json(docs);
        });
      });
    }
  });
});



//CRUD PRODUCTO
//creacion de producto
router.post("/product",(req,res) => {
//validacion
if(req.body.name ==""&& req.body.email == "" ){
  res.status(400).json({"msn" : "formato incorrecto"});
  return;
}
var product = {
  name: req.body.name,
  image: "",
  price: req.body.price,
  category: req.body.category,
  description: req.body.description,
  cantidad :req.body.cantidad ,
  log:req.body.log,
  lat:req.body.lat,
  registerDate: new Date(),
  //iduser :req.body.iduser,
};
var productData = new Product(product);

productData.save().then( () => {
  res.status(200).json({
    "msn" : "producto Registrado con exito"
  });
});
});

//Lectura de todos los productos
router.get("/product"/*,verifytoken*/, (req,res,next) => {
  //linea de abajo requiere para validad token
  //console.log(req.token);
  Product.find({}).exec((error,docs) => {
  res.status(200).json(docs);
 })
});

//eliminar producto
router.delete(/product\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Product.find({_id : id}).remove().exec((error,docs) => {
    res.status(200).json(docs);
  })
});

//actualizar producto
router.patch("/product",(req, res) => {
  if (req.query.id == null){
    res.status(300).json({
      msm:"error no existe id"
    });
    return;
  }
  var id =req.query.id;
  var product = req.body;
  Product.findOneAndUpdate({_id: id},product,(error,docs) => {
    res.status(200).json(docs);
    return;
});
});


module.exports = router;
