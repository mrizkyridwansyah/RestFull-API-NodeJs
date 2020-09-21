'use strict';

let response = require('./response.js');
let connection = require('./connection.js');

exports.index = function (req, res) {
	response.ok('Aplikasi running', res);
}

exports.a = function(req, res) {
	response.ok('asdf',res);
}