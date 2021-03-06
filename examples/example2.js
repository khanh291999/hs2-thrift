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

async function queryImpala() {
	try {
		const session = await client.connect(config);
		console.log("Session created.");
		const result = await client.query(session, sqlQuery);
		console.log("Result: " + sqlQuery + " => \n" + JSON.stringify(result));
		if (config.retain_session == null) {
			await client.disconnect(session);
			console.log("Disconnected from server and closed session successfully.");
			process.exit(0);
		}
	} catch (error) {
		console.log("Error: " + JSON.stringify(error));
		await client.disconnect(session);
		process.exit(1);
	}
}
queryImpala();
