var mysql = require('mysql');
var connection = {
    getConnection: function() {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "uploadexample"
        });
        return conn;
    }
}
module.exports = connection;