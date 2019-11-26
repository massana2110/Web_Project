const mongoose = require('mongoose')

const { Schema } = mongoose;

const Rooms = require('../models/Room');

BuildingSchema = new Schema({
    correlative: {type: String, required: true},
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'rooms',
        required: true
    }],
    isAvailable: {type: Boolean, default: true}
});

module.exports = mongoose.model('buildings', BuildingSchema);
