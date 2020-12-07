const express = require('express');
const mongoose = require('mongoose');
const CarPark = require('./models/park.js');
const CarLeave = require('./models/leave.js');
const CarParkOption1 = require('./models/option1.js');
const CarParkOption2 = require('./models/option2.js');
const CarParkOption3 = require('./models/option3.js');

//express app

const app = express();
var slots = [];
var i;
var carSlt;

//initialising 1000 car slots
for(i=0;i<1000;i++)
{
  slots[i]=0;
}

//connect to MongoDB through mongoose
//listening to local server on port 3000
const dbURI = 'mongodb+srv://rajeevsrisai:test1234@cluster0.4j6rq.mongodb.net/parking?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err)=>console.log(err));

//register view Engines

app.set('view engine','ejs');
app.set('views','webPages');

//list of all cars in the parking lot

app.get('/all-cars',(req,res)=>{
  CarPark.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

//middleware encoding URL
app.use(express.urlencoded({extended:true}));


//entry page hosted on local server

app.get('/',(req,res) => {
  res.render('openingPage',{title:'Home'});
});

//Customer Page

app.get('/customer',(req,res) => {
  res.render('customer',{title:'Customer'});
});

//Owner Page

app.get('/owner',(req,res) => {
  res.render('owner',{title:'Owner'});
});

//Parking Page

app.get('/park',(req,res) => {
  res.render('park',{title:'Parking'});
});

//Leaving Page

app.get('/leave',(req,res) => {
  res.render('leave',{title:'Leaving'});
});

//Receiving data from Parking page

app.post('/park',(req,res) => {
  for(carSlt=0;carSlt<1000;carSlt++)
  {
    if(slots[carSlt]==0)
    {
      slots[carSlt] = 1;
      break;
    }
  }
  const carPark = CarPark(req.body);
  carPark.carSlot = carSlt;

    carPark.save()
    .then((result)=>{
      res.redirect('/');
    })
    .catch((err)=>{
      console.log(err);
    });
});


//Receiving data from Leaving page

app.post('/leave',(req,res) => {

  const carLeave = CarLeave(req.body);


  carnum = carLeave.carNumber;
  //slots[carLeave.carSlot]=0;
  //Removing data of cars that leave parking area
  CarPark.remove({ carNumber: carnum }, function(err, result) {
  if (err) {
    console.err(err);
  } else {
    res.redirect('/');
  }
});
});

//Option pages for the Owner/Government
app.get('/option1',(req,res) => {
  res.render('option1',{title:'Option1'});
});
app.get('/option2',(req,res) => {
  res.render('option2',{title:'Option2'});
});
app.get('/option3',(req,res) => {
  res.render('option3',{title:'Option3'});
});


//Receiving data from Option pages

app.post('/option2',(req,res)=>{
  const carPark = CarParkOption2(req.body);
  carnum = carPark.carNumber;
  CarPark.find({ carNumber : carnum })
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.post('/option1',(req,res)=>{
  const carPark = CarParkOption1(req.body);
  color = carPark.carColor;
  CarPark.find({ carColor : color })
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});

app.post('/option3',(req,res)=>{
  const carPark = CarParkOption3(req.body);
  color = carPark.carColor;
  CarPark.find({ carColor : color })
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
});



//404 eroor page 
app.use((req,res) =>{

  //res.status(404).sendFile('./webPages/404.html',{root: __dirname});
  res.status(404).render('404',{title:'Error'});
});
