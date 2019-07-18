var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const Imagen = require('../../../database/collection/imagen');

/*Obtener todas las imagenes */
router.get("/uploadproduct", (req, res) => {
    Imagen.find().exec().then(docs => {
      res.json({
        data: docs
      });
    })
    .catch(err => {
      res.status(500).json({
            "msn": "Error al subir la imagen"
      })
    });
  });
