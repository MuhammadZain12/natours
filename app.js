const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json())

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));


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
    const newId=tours.length+1;
    const newTour=Object.assign({id:newId},req.body)
    console.log(req.body)
    tours.push(newTour)
    fs.writeFile('./dev-data/data/tours.json',JSON.stringify(tours),err=>{
        try{res.status(201).json(
            {
                status:"success",
                data:{
                    tour:newTour,
                }
            }
        )}
        catch{
            res.end(err)
        }
    })
})


app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params)
    const id=req.params.id*1
    console.log(id)
    const tour=tours.find(item=>item.id===id)
    console.log(tour)
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
})


const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
