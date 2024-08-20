const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:5000/resetPasswordDB',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('mongoDB connected...');
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;