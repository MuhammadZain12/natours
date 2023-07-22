const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json())

tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));


app.get('/', (req, res) => {
  res.send('Welcome From The Server');
});

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results:tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours',(req,res)=>{
    console.log(req.body)
})

const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
