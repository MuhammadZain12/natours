const { default: mongoose, model } = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name field is required'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
