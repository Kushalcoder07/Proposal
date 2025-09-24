const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Status', statusSchema);