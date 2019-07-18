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
var upload = multer({
  storage: storage,
  dest :path.join(),
}).single("img");


//CRUD DE IMAGENES
//SUBIR IMAGEN A UN PRODUCTO  POST
router.post("/uploadproduct", (req,res) => {

      upload(req, res, (err) => {
        if(err){
          res.status(500).json({
            "msn": "Error al subir la imagen"
          });
        }else{
        if (req.file == undefined) {
          return res.status(400).json({
            "error" : 'No se recibio la imagen'
          });
        }
        let fields = req.body
        var img = {
          name : req.file.originalname,
          idUsuario: fields.vendedor,
          path : req.file.path,
        };

        var modelImagen = new Imagen(img);
        modelImagen.save().then( (result) =>{
          let datos = {
                vendedor:fields.vendedor,
                description:fields.description,
                price:fields.price,
                cantidad:fields.cantidad,
                category:fields.category,

                image:'/api/imagenes/' + result._id,
            }
            if (fields.cantidad == 0 && fields.estado == 'disponible') {
                datos.estado = 'agotado';
            }else{
                datos.estado = fields.estado;
            }
            const modelProducto = new Producto(datos);
            return modelProducto.save()
          })
          .then(result => {
           res.status(201).json({message: 'Se Agrego el producto',result});
           })
          .catch(err => {
          res.status(500).json({error:err.message})
         });
        }
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
