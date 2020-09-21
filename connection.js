const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'kost'
});

conn.connect((error) => {
	if(error) throw error;
	console.log('Database Connected');
});

module.export = conn;