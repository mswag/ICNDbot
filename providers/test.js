const { ICNDB, Wit }  = require("./index.js")

// Config
let validationPattern = {

	intents: [
		{
			value: "get_joke"
		}
	],

	entities: {

		firstname: {
			
		},

		lastname: {

		},

		category: {
			collection: true
		}
	}
}

// ICNDB Request
ICNDB.random('Edward', 'Norton', ['nerdy']).then((body) => {
    console.log(body)
});


// Wit Request
Wit.message('tell me a joke about Edward Norton').then((data) => {
	let result = Wit.validateIntent(data, validationPattern)
	console.log(result)
})