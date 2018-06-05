// Modules
const TelegramBot = require('node-telegram-bot-api') // https://www.npmjs.com/package/node-telegram-bot-api

// Vars
const token = process.env.npm_package_config_telegramtoken
const port = process.env.PORT

// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443'


// Set Webhook
bot.setWebHook(`${url}/bot${token}`);