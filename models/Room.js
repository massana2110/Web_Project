const mongoose = require('mongoose')

const {Schema } = mongoose;

RoomSchema = new Schema({
    typeRoom: {type: String, required: true},
    correlative: {type: String, required: true},
    cost: {type: Number, required: true},
    isAvailable: {type: Boolean, required: true, default: true},
});

var room = mongoose.model('rooms', RoomSchema)

module.exports = room;
