const { Wit, log } = require('node-wit')

const client = new Wit({
  accessToken: process.env.npm_package_config_wittoken,
  logger: new log.Logger(log.DEBUG) 
})

function validateIntent(response, validationPattern, requiredAllEntities = true, requiredAllIntents = true) {

	let areIntentsValidate = false

	if(validationPattern.intents == null) { validationPattern.intents = []; areIntentsValidate = true }
	for(let index in validationPattern.intents) {

		let searchIntent = validationPattern.intents[index]
		let searchConfidence = searchIntent.confidence
		if(searchConfidence == undefined) { searchConfidence = 0 }

		for(let index in response.entities.intent) {
			let intent = response.entities.intent[index]

			if(intent.value == searchIntent.value && searchConfidence <= intent.confidence) { 
				areIntentsValidate = true
				break
			}
		}

		if(areIntentsValidate == false && requiredAllIntents) break;

	}

	let values = {}
	let areEntitiesValidate = false

	if(validationPattern.entities == null) { validationPattern.entities = [] }
	for(let searchKey in validationPattern.entities) {

		let searchEntity = validationPattern.entities[searchKey]
		let searchConfidence = searchEntity.confidence
		if(searchConfidence == undefined) { searchConfidence = 0 }

		for(let entityKey in response.entities) {

			let entityValues = response.entities[entityKey]
			for(let index in entityValues) {

				let entity = entityValues[index]
			
				if(searchKey == entityKey && entity.confidence >= searchConfidence && (entity.suggested || entityValues.length == 1 || searchEntity.collection)) {
				
					if(searchEntity.collection) {

						if(values[entityKey] == undefined) values[entityKey] = [];
						if (/\s/.test(entity.value)) {
							values[entityKey].concat(entity.value.split(' '))
						} else {
							values[entityKey].push(entity.value)
						}

					} else {
						values[entityKey] = entity.value
						areEntitiesValidate = true
						break
					}
				}

			}

		}

		if(areEntitiesValidate == false && requiredAllEntities) break;

	}


	if(areEntitiesValidate && areIntentsValidate) {
		if(Object.keys(values).length > 0) { return values }
		return true
	} else {
		if(validationPattern.entities.lengths > 0) { return null }
		return false
	}

}

exports.message = client.message
exports.validateIntent = validateIntent