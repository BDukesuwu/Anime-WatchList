const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make a new schema that holds each voice actors name in an object, and the date theyre born
//show timestamps
const vactorSchema = new Schema({
  name: {type: String, required: true, unique: true},   // voice actor name must have a unique value, meaning the value
  born: Date                                            // can only be entered once otherwise you get a duplicate key error
}, {
  timestamps: true
});

module.exports = mongoose.model('Vactor', vactorSchema);