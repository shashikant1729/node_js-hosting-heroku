const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://dbUser:db12User3456@cluster0.4yriq.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongo_url);
const port = process.env.PORT || 80;

mongoose.connect(mongo_url)
    .then(()=> {
    console.log("connect with altas");
    })
    .catch((err) => {
    console.log("error");
})


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender : String,
    address : String,
    more: String,
    card: String,
    card_number: Number,
    exp_date: Date,
    CVV: Number,

  });

const contact = mongoose.model('contact', contactSchema);



const { Mongoose } = require('mongoose');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.static('static', Option));

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
// app.use(express.urlencoded);


//PUB SPECIFIC STUFF

app.set('view engine', 'pug');  //set the templete engine as pug
app.set('views', path.join(__dirname, 'views'));


// END POINT
app.get('/', (req, res)=>{
    const para =  {};
    res.status(200).render('home.pug', para);
})
app.get('/contact', (req, res)=>{
    const para =  {};
    res.status(200).render('contact.pug', para);
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.status(200).render('thanks.pug');
    }).catch(()=>{
        res.status(400).send("data cannot save")
    });
    // res.status(200).render('contact.pug');
})


// for getting information from gym form 
// app.post('/contact', (req, res)=>{
//     name  = req.body.name;
//     age  = req.body.age;
//     gender  = req.body.gender;
//     address  = req.body.address;
//     more  = req.body.more;
//     card  = req.body.card;
//     card_number  = req.body.card_number;
//     exp_date  = req.body.exp_date;
//     CVV  = req.body.CVV;

//     let outputtowrite = `the name of client : ${name}\nage : ${age}\ngender : ${gender} \naddress : ${address} \nMore about ${name}: ${more} \n\nPAYMENT DETAILS \ncard : ${card}\ncard_number : ${card_number}\nexp_date : ${exp_date}\nCVV : ${CVV}` 


//     fs.writeFileSync(`static/gym_members_submit/${name}.text`, outputtowrite)
//     const para = { 'message': 'Your Form Is Submitted Successfully' };
    
//     res.status(200).render('thanks.pug');

   
// })

// START SERVER
app.listen(port, ()=>{
    console.log("Your Code Run Successfully");
})

