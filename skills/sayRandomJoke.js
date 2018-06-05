const { ICNDB, Wit } = require('../providers')
const MswagURLInlineKeyBoardButton = require('../ui/inline_keyboard_buttons/mswagURL.json')

const validationPattern = {

	intents: [
		{
			value: 'get_joke'
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

const messageOptions = {
	reply_markup: {
		inline_keyboard: [
			[ 
				MswagURLInlineKeyBoardButton
			]
		]
	}
}

module.exports = function(msg, bot) {

	const chatId = msg.chat.id;

	Wit.message(msg.text).then(data => {

		let values = Wit.validateIntent(data, validationPattern, false)
		let categories = ICNDB.categoriesFromCache(values.category)

		return ICNDB.random(values.firstname, values.lastname, categories)

	})
	.then(data => bot.sendMessage(chatId, data.value.joke, JSON.stringify(messageOptions)))
	.catch(error => console.log(error))
	
}

