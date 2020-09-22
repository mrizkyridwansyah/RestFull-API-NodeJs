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
	connection.query("SELECT RIGHT(MAX(IDSupplier),6) + 1 as jml FROM ms_supplier", function (err,result) {
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
			response.ok("Data has been saved", res);
		})
	});
}

exports.updateSupplier = function (req, res) {	
	connection.query("SELECT COUNT(*) as jml FROM ms_supplier WHERE IDSupplier = ?", [req.body.id], function (err,result) {
		if(err) throw err;
		if(result[0].jml > 0){
			let sql = "UPDATE ms_supplier SET NamaSupplier = ?, AlamatSupplier = ?, NoTelp = ?, NoFax = ?, Status = ? WHERE IDSupplier = ?";
			let data = [req.body.nama, req.body.alamat, req.body.telp, req.body.fax, req.body.status, req.body.id];
			connection.query(sql, data, function (err, result) {
				if(err) throw err;
				response.ok("Data has been updated", res);
			})			
		}
		else{
			response.notFound("No data for this id", res);
		}
	});
}

exports.deleteSupplier = function (req, res) {	
	connection.query("SELECT COUNT(*) as jml FROM ms_supplier WHERE IDSupplier = ?", [req.body.id], function (err,result) {
		if(err) throw err;
		if(result[0].jml > 0){
			let sql = "DELETE FROM ms_supplier WHERE IDSupplier = ?";
			connection.query(sql, [req.body.id], function (err, result) {
				if(err) throw err;
				response.ok("Data has been deleted", res);
			})
		}
		else{
			response.notFound("No data for this id", res);
		}
	});
}

exports.nested = function (req, res) {
	let sql = "SELECT a.IDStock, a.NamaStock, b.Lvl, b.Jumlah, b.HargaJual FROM ms_stock a join ms_stock_detil b ON a.IDStock = b.IDStock";
	connection.query(sql, req.params.id , function (err, rows, fields) {
		if(err) throw err;
		// let a = {
		// 	"stock": rows.reduce(() => {
				
		// 	})
		// }rows.reduce((group, item) => {
		// 	console.log(group[item.IDStock]);
		// })
		// if(result.length == 0){
		// 	response.notFound("No data for this request",res);
		// }
		// else{
			response.ok(rows, res);			
		// }
	})
}