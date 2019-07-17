var Mensaje = require("../../../database/collections/message");
var express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    Mensaje.find().exec((err,docs)=>{
      if(docs.length>0){
        res.json(docs);
      }else{
        res.json({
          message:'no existen mensajes en la bd'
        });
      }
    });
});

module.exports=router;
