const 	MongoClient = require('mongodb').MongoClient,
		mongodb = require('mongodb'),
		variable = require('../../variable'),
		assert = require('assert');

const mongo = module.exports = {
	getCollection: function(type, callback){
		MongoClient.connect(variable.MongoUrl, function(err, db) {
			db.collection('event').find({ type: type }).toArray(callback)
		})
	},
	getEvent: function(id, callback){
		var o_id = new mongodb.ObjectId(id);
		MongoClient.connect(variable.MongoUrl, function(err, db) {
			db.collection('event').find({ _id: o_id }).toArray(callback)
		})
	},
	findUser: function(senderID, callback){
		MongoClient.connect(variable.MongoUrl, function(err, db) {
			db.collection('user').find({ senderID: senderID }).toArray(callback)
		})
	},
	sessionUser: function(result, senderID){
		console.log(result)
		if (result.length == 0){
			MongoClient.connect(variable.MongoUrl, function(err, db) {
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
				MongoClient.connect(variable.MongoUrl, function(err, db) {
					db.collection('user').update({ senderID: senderID },{$set: {openSession: true}})
				})
				return false
			}
		}
	},
}

module.exports = mongo