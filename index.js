const express = require("express");
const connectDB = require('./config/db');
const HTTP_SERVER = express();

connectDB();
HTTP_SERVER.use(express.json());
HTTP_SERVER.use('/api/auth', require('./routes/auth'));

const PORT = 5000;
const HOSTNAME = "localhost";

HTTP_SERVER.listen(PORT,HOSTNAME,1,( )=>{
    console.log(`app started at http://${HOSTNAME}:${PORT}`);
});

