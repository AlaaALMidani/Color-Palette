const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const colorsRoutes = require('./routes/colors'); 
const multer = require("multer");
const cors = require("cors");
const db = require('./models/db'); 
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use('/colors', colorsRoutes);
app.use('/colors',(req,res,next)=>{
    console.log(req.method,req.url,)
    next()
})
const port = 3000
const host = 'http://localhost:'

app.listen(port, () => {
    console.log(`Server listening on ${host}${port}`);
}); 
