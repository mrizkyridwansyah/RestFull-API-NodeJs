'use strict';

module.exports = function (app) {
	let json = require('./controller');

	app.route('/')
		.get(json.index);

	app.route('/supplier')
		.get(json.getSupplier);

	app.route('/supplier/:id')
		.get(json.getSupplierById);

	app.route('/supplier')
		.post(json.addSupplier);

	app.route('/supplier')
		.put(json.updateSupplier);

	app.route('/supplier')
		.delete(json.deleteSupplier);

	app.route('/nested')
		.get(json.nested);
}