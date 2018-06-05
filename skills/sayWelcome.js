module.exports = function(msg, bot) {

	const chatId = msg.chat.id;
	const text = 'Welcome to this amazing cyber hyper Bot'

	return bot.sendMessage(chatId, text)
	
}