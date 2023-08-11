const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './../config.env' });
const Tour=require('./../models/tourModel')

const DB = process.env.DATABASE_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log('Connecting To Database');
mongoose.connect(DB).then(() => console.log('Database connected'));

data = JSON.parse(fs.readFileSync('./data/tours.json', 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(data)
    } catch (error) {
        console.log(error)
    }
    process.exit()
};


const deleteData=async()=>{
    try {
        await Tour.deleteMany()
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if (process.argv[2]=='--import') {
    importData()
} else if(process.argv[2]=='--delete') {
    deleteData()
}
