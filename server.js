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




const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
