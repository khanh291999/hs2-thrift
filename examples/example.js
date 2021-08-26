// const client = require("hs2-thrift");  // Use this if example.js is outside hs2-thrift package e.g. used 'npm install hs2-thrift'
const client = require("../index.js");

const config = {
	host: "172.29.65.197", // Change to correspond with your config
	port: 21050, // Change to correspond with your config
	username: "", // Change to correspond with your config
	password: "", // Change to correspond with your config
	protocol_ver: 5, // Version 1 - 11. Change to suit your HS2 Protocol Version, defaults to V5
	retain_session: null // Set true if you want to retain connection and session
};

var sqlQuery = "select * from a"; // Change this query to suit your db/table

client
	.connectAndQuery(config, sqlQuery)
	.then(result => {
		console.log("Result: " + sqlQuery + " => \n" + JSON.stringify(result));
		// if retain_session == true, connection & session will remain active, process will not close
		if (config.retain_session == null) {
			process.exit(0);
		}
	})
	.catch(error => {
		console.log(JSON.stringify(error));
		process.exit(1);
	});
