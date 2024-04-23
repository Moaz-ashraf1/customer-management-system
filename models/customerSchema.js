const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    FirstName: String,
    LastName: String,

    Email: String,
    Gender: String,
    Telephone: String,
    Age: String,
    Country: String,
}, { timestamps: true });
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;