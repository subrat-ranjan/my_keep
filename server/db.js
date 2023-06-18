const mongoose = require('mongoose');


const mongoUri = "mongodb+srv://subratranjan400:TzLjBJYJEgIaQG9y@cluster0.4xmzzvr.mongodb.net/inotebook"


const connectToMongo = () => {
    mongoose.connect(mongoUri, () => {
        console.log("connected to Mongo successfully");
    })
}
module.exports = connectToMongo;