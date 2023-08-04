const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log('Connecting To Database');
mongoose.connect(DB).then(() => console.log('Database connected'));

const tourSchema = mongoose.Schema({
  name: { type: String, required: [true, 'The name field is required'] },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
});

const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
