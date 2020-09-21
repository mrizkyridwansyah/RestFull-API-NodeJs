'use strict';

exports.ok = function (values, res) {
	let data = {
		'status': 200,
		'values': values
	}

	res.json(data);
	res.end();
}

exports.notFound = function (message, res) {
	let data = {
		'status': 404,
		'message': message
	}

	res.json(data);
	res.end();
}