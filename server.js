const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const app=require('./app')

if(process.env.NODE_ENV==='development'){
  console.log(process.env)
}

const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
