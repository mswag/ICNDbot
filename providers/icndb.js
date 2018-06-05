// Modules
const request = require("request")

// Config
const domain = "https://api.icndb.com"
const headers = {
	"Content-Type": "application/json"
}

// Promise Request Wrapper
function sendRequest(options) {
	return new Promise((success, failed) => {
		request(options, function (error, response, body) {
			if(error) failed();
			else success(body);
		});
	})	
}

/*
* fetch existing categories in ICNDB from cache 
*/
exports.categoriesFromCache = function(excludes) {

	let path = '../cache/js/categories.json'
	let categories = require(path)

	let validCategories = []
	for(let index in categories) {

		let category = categories[index]
		let valid = true

		for(let index in excludes) {
			let exclude = excludes[index]
			if(exclude == category) {
				valid = false
				break
			}
		}

		if(valid) {
			validCategories.push(category)
		}

	}

	return validCategories
}

// fetch existing categories from ICNDB (http://www.icndb.com/api)
exports.categories = function() {

	const options = {
		url: domain + "/categories",
		method: "GET",
		headers: headers,
		json: true
	}

	return sendRequest(options)
}

// fetch radom kojes from ICNDB (http://www.icndb.com/api)
exports.random = function(firstname, lastname, excludes) {

	const options = {
		url: domain + "/jokes/random",
		method: "GET",
		headers: headers,
		json: true,
		qs: {
			"firstName": firstname,
			"lastName": lastname,
			"exclude": "[" + excludes.toString() + "]"
		}
	}

	return sendRequest(options)
}
