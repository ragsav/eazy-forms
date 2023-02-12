require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL;

// Database Connection
async function MongoDBConnection(app) {
    console.log(`| MongoDB URL  : ${mongoURI}`);
    await mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        
        useUnifiedTopology: true,
        
      })
      .then(() => {
        console.log("| MongoDB Connected");
        console.log("|--------------------------------------------");
      });
  
    return app;
  }

const connectMongoDB = (app) =>{
    mongoose.Promise = global.Promise;
    Promise.resolve(app)
    .then(MongoDBConnection)
    .catch((err) =>
        console.log({err})
    );
}

module.exports = {connectMongoDB}

