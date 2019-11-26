const mongoose = require('mongoose')

const {Schema } = mongoose;

RoomSchema = new Schema({
     type: {type: String},
     correlative: {type: String},
     cost: {type: Number},
     isAvailable: {type: Boolean}

});

module.exports = mongoose.model('Room', RoomSchema);
