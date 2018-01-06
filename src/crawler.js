const fs = require("fs");
const URL = require("url-parse");
const _ = require("lodash");
const Parser = require("./parser");

const main = () => {
	const ultronParser = Parser();
	/*Here i'm getting the links and processing the results in the
    annonomyous function that takes in error, response, and body.
    */
	retrieveLinks((error, resp) => {
		if(error){
			console.log("Error", error);
			return false;
		}
		let obj = JSON.parse(resp);
		ultronParser.links = obj;
		console.log("Starting ultron's helper");
		ultronParser.runLinks();
	});
};

/**
 * This function takes a callback function to process the results
 * of the reading of the links to process from a file.
 * @param {*} callback 
 */
const retrieveLinks = (callback) => {
	return fs.readFile("./src/links.json","utf8",callback);
};

main();
