const mongoose = require('mongoose')

const {Schema } = mongoose;

ReservationSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, requires: true},
    arrive_date: {type: Date, required: true},
    departure_date: {type: Date, required: true},
    room: {type: String, required: true},
    package: {type: String, required: true}
});

module.exports = mongoose.model('Reservacion', ReservationSchema);
