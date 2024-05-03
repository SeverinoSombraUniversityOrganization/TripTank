const mongoose = require('mongoose');
const { Schema } = mongoose;

const fuelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

const FuelModel = mongoose.model('Fuel', fuelSchema);
module.exports = FuelModel;
