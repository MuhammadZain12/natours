const { default: mongoose, model } = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required'],
      unique: true,
      maxlength: [
        40,
        'A tour name must have less than or equal to 40 characters',
      ],
      minlength: [
        10,
        'A tour name must have greater than 10 characters',
      ],
    },
    slug: String,
    duration: { type: Number, required: [true, 'A tour must have a duration'] },
    secreteTour: { type: Boolean, default: false },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy,medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5.0, 'rating must be below 5.0'],
      min: [1.0, 'rating must be above 1.0'],
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount Price ({VALUE}) Should Be Less Than Actual Price',
      },
    },
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

//Virtual Fields
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Just Like middlewares in express we also have middleware in mongo
// In Mongo Our middleware can be applied on documents and event is used as hook after or before which  we are to use that middleware
// only run before save() and create() not before update()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc,next) {
//   console.log('Post middleware called your saved document : '+doc);
//   next();
// });

//Query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secreteTour: { $ne: true } });
  next();
});

// tourSchema.post(/^find/,function(docs, next){
//   // Here Docs Are The Documents That We Received After Query
//   console.log(docs)
//   next()
// })

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secreteTour: { $ne: true } } });
  next();
});

//post aggregate are also possible but they are quite rare in use

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
