const 	MongoClient = require('mongodb').MongoClient,
		mongodb = require('mongodb')
		assert = require('assert');

var db_url = 'mongodb://localhost:27017/chartbot'

const mongo = module.exports = {
	getCollection: function(type, callback){
		MongoClient.connect(db_url, function(err, db) {
			db.collection('event').find({ type: type }).toArray(callback)
		})
	},
	getDescription: function(id, callback){
		var o_id = new mongodb.ObjectId(id);
		MongoClient.connect(db_url, function(err, db) {
			db.collection('event').find({ _id: o_id }, {header: 1}).toArray(callback)
		})
	},
	handleUser: function(senderID, callback){
		MongoClient.connect(db_url, function(err, db) {
			db.collection('user').find({ senderID: senderID }).toArray(callback)
		})
	},
	updateUser: function(result, senderID){
		console.log(result)
		if (result.length == 0){
			MongoClient.connect(db_url, function(err, db) {
				assert.equal(null, err);
				console.log("Openning session for user "+senderID);
				
				db.collection('user').insert({senderID: senderID, openSession: true})
				db.close();
			});
			return false	
		} else {
			if(result[0].openSession){
				return true	
			} else {
				MongoClient.connect(db_url, function(err, db) {
					db.collection('user').update({ senderID: senderID },{$set: {openSession: true}})
				})
				return false
			}
		}
	},
}

module.exports = mongo