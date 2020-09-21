'use strict';

let response = require('./response.js');
let connection = require('./connection.js');

exports.index = function (req, res) {
	response.ok('Aplikasi running', res);
}

exports.allSupplier = function (req, res) {
	let sql = "SELECT * FROM ms_supplier";
	connection.query(sql, function (err, result) {
		if(err) throw err;
		response.ok(result, res);
	})
}