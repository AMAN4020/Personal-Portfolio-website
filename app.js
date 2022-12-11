// const express = require('express');
// const app = express();
// const path = require("path");
// const port = 8000;

// const staticpath = path.join(__dirname, 'views');

// app.use(express.static(staticpath));

// app.get("/", (req, res)=>{
//   res.send();
// });
// app.listen(8000, ()=>{
//   console.log("listening the port at 8000");
// });


const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = 8000;

app.use(bodyparser.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost/contactme', {useNewUrlParser: true});

// define mongo schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    Enqurie: String,
    check: String
  });
  const contact = mongoose.model('contact', contactSchema);

const staticpath = path.join(__dirname, 'views');

app.use(express.static(staticpath));

app.get("/contact", (req, res)=>{
  res.sendFile(__dirname + "/contact.html");
});

app.post('/contact', (req, res)=>{
  let newNote = new contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    Enqurie: req.body.Enqurie,
    check: req.body.check
  })
  newNote.save().then(()=>{
    res.redirect('/thanks.html')
  }).catch(()=>{
    res.status(400).send("item was not saved to the database.")
  })
});

app.listen(8000, ()=>{
  console.log("listening the port at 8000");
});
