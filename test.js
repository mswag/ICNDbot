const TelegramTest = require('telegram-test')
const bot = require('./bot.js')

let testChatId = 1
let test = new TelegramTest(bot)

// Test Message
test.sendUpdate(testChatId, 'tell me a joke about John Smith').then((data) => console.log(data))
//test.sendUpdate(testChatId, '/start').then((data) => console.log(data.text))