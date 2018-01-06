const requestP = require("request-promise");
const cheerio = require("cheerio");
const _ = require("lodash");
const ERROR = require("./myerror");

module.exports = Parser = (_links = []) => {
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