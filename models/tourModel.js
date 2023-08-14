const { default: mongoose, model } = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name field is required'],
    unique: true,
  },
  duration: { type: Number, required: [true, 'A tour must have a duration'] },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  priceDiscount: Number,
  summery:{type:String,trim:true,reuired:[true,'A tour must have a description']},
  description:{
    type:String,
    trim:true,
  },
  imageCover:{
    type:String,
    required:[true,'A tour must have a cover Image'],
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now(),
    select:false,
  },
  startDate:[Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
