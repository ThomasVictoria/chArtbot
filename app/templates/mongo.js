const 	MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

var db_url = 'mongodb://localhost:27017/chartbot'

const mongo = module.exports = {
	getCollection: function(collectionName, callback){
		MongoClient.connect(db_url, function(err, db) {
			var cursor = db.collection(collectionName).find({}).toArray(callback)
		})
	},
	getDescription: function(id, callback){
		MongoClient.connect(db_url, function(err, db) {
			var cursor = db.collection(collectionName).find({ _id: id }, {header: 1}).toArray(callback)
		})
	}
}

module.exports = mongo