// Modules
const Promise = require('bluebird') // https://www.npmjs.com/package/bluebird
const TelegramBot = require('node-telegram-bot-api') // https://www.npmjs.com/package/node-telegram-bot-api
const Skills = require('./skills')

// Vars
const bot = new TelegramBot(process.env.npm_package_config_telegramtoken, { polling: true })
const commands = {
	start: '/start'
}

// Regex for filtering Commands
const commandValues = Object.values(commands).join('|')
const messeageRegex = new RegExp(`^(?!${commandValues}).+`, 'g')
bot.onText(messeageRegex, (msg) => {
	Skills.sayRandomJoke(msg, bot)
})

// Regex for start Command
const startRegex = new RegExp(commands.start, 'g')
bot.onText(startRegex, (msg, match) => {
	Skills.sayWelcome(msg, bot)
})

// Exports
module.exports = bot