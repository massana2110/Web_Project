const { Schema, model } = require('mongoose')

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
})

/**
 * Cifrar password
 */
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);