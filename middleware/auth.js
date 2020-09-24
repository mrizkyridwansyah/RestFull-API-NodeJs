let connection = require('../connection');
let response = require('../response');
let config = require('../config/secret');
let mysql = require('mysql');
let md5 = require('md5');
let jwt = require('jsonwebtoken');
let ip = require('ip');
let moment = require('moment');

//controller register
exports.register = function (req, res) {
	let post = {
		username: req.body.username,
		email: req.body.email,
		password: md5(req.body.password),
		role: req.body.role,
		tgl_daftar: moment().format('YYYY-MM-DD HH:mm:ss')	
	}

	let sql = "SELECT email FROM auth_api WHERE email = ?";
	connection.query(sql, post.email, function (err, result) {
		if(err) throw err;
		if(result.length > 0){
			response.message(409, "The email already exists", null, res);
		}
		else{
			sql = "INSERT INTO auth_api SET ?";
			connection.query(sql, post, function (err, result) {
				if(err) throw err;
				response.ok(200, "Register success!", null , res);
			})
		}
	})
}