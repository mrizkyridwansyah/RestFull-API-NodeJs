'use strict';

let response = require('./response.js');
let connection = require('./connection.js');

exports.index = function (req, res) {
	response.ok('Aplikasi running', res);
}

exports.getSupplier = function (req, res) {
	let sql = "SELECT * FROM ms_supplier";
	connection.query(sql, function (err, result) {
		if(err) throw err;
		if(result.length == 0){
			response.notFound("No data for this request",res);
		}
		else{
			response.ok(result, res);			
		}
	})
}

exports.getSupplierById = function (req, res) {
	let sql = "SELECT * FROM ms_supplier WHERE IDSupplier = ? ";
	connection.query(sql, req.params.id , function (err, result) {
		if(err) throw err;
		if(result.length == 0){
			response.notFound("No data for this request",res);
		}
		else{
			response.ok(result, res);			
		}
	})
}