'use strict';

let moment = require('moment');
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

exports.addSupplier = function (req, res) {
	connection.query("SELECT COUNT(*) + 1 as jml FROM ms_supplier", function (err,result) {
		if(err) throw err;
		let data = {
			IDSupplier: "SUP." + String("000000" + result[0].jml).slice(-6),
			NamaSupplier: req.body.nama,
			AlamatSupplier: req.body.alamat,
			NoTelp: req.body.telp,
			NoFax: req.body.fax,
			Status: 'A',
			TglInput: moment().format('YYYY-MM-DD HH:mm:ss')	
		}

		let sql = "INSERT INTO ms_supplier SET ?";
		connection.query(sql, data, function (err, result) {
			if(err) throw err;
			response.ok("Data Tersimpan", res);
		})
	});

}