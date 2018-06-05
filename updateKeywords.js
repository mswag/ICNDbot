const { ICNDB } = require("./providers")
const WitKeywords = require('wit-keywords')
const fs = require('fs')

ICNDB.categories().then((categories) => {

	fs.writeFile("./cache/js/categories.json", JSON.stringify(categories.value), function(err) {
    	if(err) return console.log(err);

    	let path = '../cache/js/categories.json'
		delete require.cache[require.resolve(path)]
		
  	 	console.log("Categories was saved!")
	})

	return new WitKeywords(process.env.npm_package_config_wittoken)
  	.entity('category')
  	.push(categories.value)

})
 .then(response => console.log(response))
 .catch(err => console.log(err));


