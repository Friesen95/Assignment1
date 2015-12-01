//import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema object

var ContactSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	businessName: String,
    jobPossibilities: String
}, 
{
	collection: 'contactInfo'
});
module.exports = mongoose.model('Contact', ContactSchema);