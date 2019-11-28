const mongoose = require('mongoose')

const {Schema } = mongoose;

ReservationSchema = new Schema({
    phone: {type: String, required: true},
    email: {type: String, required: true},
    arrive_date: {type: Date, required: true},
    departure_date: {type: Date, required: true},
    room: {type: String, required: true},
    package: {type: String, required: true},
    user: {type: String}
});

module.exports = mongoose.model('Reservacion', ReservationSchema);
