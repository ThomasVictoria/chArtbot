const 	MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

var db_url = 'mongodb://localhost:27017/chartbot'

const mongo = module.exports = {
	getCollection: function(collectionName, callback){
		console.log(collectionName)
		MongoClient.connect(db_url, function(err, db) {
			var cursor = db.collection(collectionName).find({}).toArray(callback)
		})
	}
}

module.exports = mongo