'use strict';

module.exports = function (app) {
	let json = require('./controller');

	app.route('/')
		.get(json.index);

	app.route('/supplier')
		.get(json.getSupplier);

	app.route('/supplier/:id')
		.get(json.getSupplierById);

}