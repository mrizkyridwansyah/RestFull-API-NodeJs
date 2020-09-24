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
		if(err) response.message(150, "error !", null, res);
		if(result.length > 0){
			response.message(409, "The email already exists", null, res);
		}
		else{
			sql = "INSERT INTO auth_api SET ?";
			connection.query(sql, post, function (err, result) {
				if(err) response.message(150, "error !", null, res);
				response.ok(200, "Register success!", null , res);
			})
		}
	})
}

exports.login = function (req, res) {
	let sql = "SELECT * FROM auth_api WHERE email = ? AND password = ?";
	connection.query(sql, [req.body.email, md5(req.body.password)], function (err, result) {
		if(err) response.message(150, "error !", null, res);
		if(result.length > 0){
			let token = jwt.sign({result}, config.secret, {
				expiresIn: 1440//25 menit
			});

			let data = {
				id_user: result[0].id,
				access_token: token,
				ip_address: ip.address()
			}
			console.log(data);
			sql = "INSERT INTO akses_token SET ?";
			connection.query(sql, data, function (err, result) {
				if(err) response.message(150, "error !", null, res);
				let dataResponse = {
					Token: token,
					IdUser: data.id_user
				};

				response.message(200, "Token has been generated", dataResponse, res);
			})
		}
		else{
			response.message(401, "Invalid email or password", null, res);
		}
	})
}