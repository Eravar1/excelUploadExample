//imports
var express = require("express");
var app = express();
const crypto = require("crypto");
const ExcelJS = require("exceljs");
const excel = require("../model/excel")

//------------
//Multer setup
//------------
const multer = require("multer");
const excelFile = require("../model/excel");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploadedFiles");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname + "-" + crypto.randomBytes(16).toString("hex") + ".xlsx"
    );
    //crypto.randomBytes is used to generate a new filename so as to prevent name conflict.
    //alternatively, use date.now() instead of crypto to generate unique name
  },
});
var upload = multer({
  storage: storage,
});

//-------------------
//End of multer setup
//-------------------

app.post("/upload", upload.single("file"), function (req, res) {
  const wbook = new ExcelJS.Workbook();

  const fileLocation = req.file.path;
  wbook.xlsx
    .readFile(fileLocation)
    .then(() => {
      const ws = wbook.worksheets[0];
      // ws.eachRow({ includeEmpty: true }, function (row) {
      //   console.log(row.values.slice(1));
      //   //Send this value somewhere else
      // });

      for(var i =2; i<ws.rowCount; i++){
        excel.uploadRow(ws.getRow(i).values.slice(1), function(err, result) {
          if (err) {
              res.status(500);
          } else {
              if (result.affectedRows == 1) {
                  res.status(200);
              } else {
                  res.status(304);
              }
          }
      })
      }
      res.end();
    })
    .catch((err) => {
      console.log(err.message);
    });
  return res.end();
});

module.exports = app;
