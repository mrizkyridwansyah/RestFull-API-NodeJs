'use strict';

exports.message = function (status, message, values, res) {
	let data = {
		'message': message,
		'values': values
	}

	res.status(status).json(data);
	res.end();
}