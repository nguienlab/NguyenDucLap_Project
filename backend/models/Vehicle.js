const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
  },
  type: {
    type: String,
    enum: ['ô tô', 'xe máy'],
    required: [true, 'Please specify the type (ô tô / xe máy)'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  year: {
    type: Number,
    required: [true, 'Please add the year of manufacture'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  image: {
    type: String, // URL to the image
    required: [true, 'Please add an image URL'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add the stock quantity'],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
