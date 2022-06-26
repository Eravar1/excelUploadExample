const db = require("./databaseConfig");
let excelFile = {
  uploadRow: function (excelData, callback) {
    var connection = db.getConnection();
    connection.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        const uploadRow =
          `INSERT INTO exampleTable (column1, column2, column3, column4, column5, 
            column6, column7, column8, column9, column10) VALUES (?,?,?,?,?,?,?,?,?,?);`;
        connection.query(
          uploadRow,
          excelData,
          (error, result) => {
            connection.end();
            if (error) {
              return callback(error, null);
            }
            if (result.length == 0) {
              return callback(null, null);
            } else {
              return callback(null, result);
            }
          }
        );
      }
    });
  },
};
module.exports = excelFile;
