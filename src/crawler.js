const requestP = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const URL = require("url-parse");
const _ = require("lodash");

const ERROR = {
	INVALID_PAGE: "Invalid Page Specified",
	ERROR: "Error"
};

const Parser = (_links = []) => {
	this.link = _links;
	this.processRequest = ($) => {
		// Parse the document body
		console.log(`Page title:  ${$("title").text()}`);
	};
    
	this.parsePage = (page) => {
		if (!page || _.isEmpty(page.link)) {
			console.log(ERROR.INVALID_PAGE);
			return;
		}
		let options = {
			uri : page.link,
			transform: function (body) {
				return cheerio.load(body);
			}
		};
		console.log(`Visiting ${page.name}`);
		requestP(options)
			.then(this.processRequest)
			.catch((err) => {
				console.log(ERROR.ERROR, err);
			});
	};
    
	this.runLinks = () => {
		if (!this.links) {
			console.log("No Links to process!");
			return;
		}
		_.each(this.links, this.parsePage);
	};
    
	return this;
};

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
