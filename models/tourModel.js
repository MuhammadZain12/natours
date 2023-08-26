const { default: mongoose, model } = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required'],
      unique: true,
    },
    slug: String,
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
    summery: {
      type: String,
      trim: true,
      reuired: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover Image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Just Like middlewares in express we also have middleware in mongo
// In Mongo Our middleware can be applied on documents and event is used as hook after or before which  we are to use that middleware

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (next) {
//   console.log('Post middleware called');
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
