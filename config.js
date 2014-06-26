/**
 * New node file
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'radityabp',
  database : 'tangga'
});
var databasename = "tangga.";

exports.connection = connection;
exports.databasename = databasename;
exports.uuid = require('node-uuid');