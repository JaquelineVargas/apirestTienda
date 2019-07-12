var express = require('express');
var multer = require ('multer');
var router = express.Router();
var _ = require("underscore");
var  Product = require("../../../database/collections/product");
var jwt =require("jsonwebtoken");

//USO DE MULTER SE ALMACENAN LAS IMAGENES EN IMAGES
var storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    //nombres de imagenes guardado por fecha
    cb(null, "IMG_" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");;

/*
//CREACION DE IMAGENES LARGO
router.post(/productimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        idhome: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var product = {
          image: new Array()
        }
        Home.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);
          var data = docs.image;
          var aux = new  Array();
          if (data.length == 1 && data[0] == "") {
            product.image.push("/api/v1.0/productimg/" + infoimg._id)
          } else {
            aux.push("/api/v1.0/productimg/" + infoimg._id);
            data = data.concat(aux);
            product.image = data;
          }
          Home.findOneAndUpdate({_id : id}, product, (err, params) => {
              if (err) {
                res.status(500).json({
                  "msn" : "error en la actualizacion del usuario"
                });
                return;
              }
              res.status(200).json(
                req.file
              );
              return;
          });
        });
      });
    }
  });
});
router.get(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Img.findOne({_id: id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
      return;
    }
    //regresamos la imagen deseada
    var img = fs.readFileSync("./" + docs.physicalpath);
    //var img = fs.readFileSync("./public/avatars/img.jpg");
    res.contentType('image/jpeg');
    res.status(200).send(img);
  });
});

*/
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



module.exports = router;
