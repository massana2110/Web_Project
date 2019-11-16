const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
})

/**
 * Todo: Cifrar password
 */

module.exports = model('User', UserSchema);