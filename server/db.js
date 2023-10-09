const mongoose = require('mongoose');


const mongoUri = "mongodb+srv://subratranjan400:TzLjBJYJEgIaQG9y@cluster0.4xmzzvr.mongodb.net/inotebook"

const connectToMongo = async () => {
    try {
        // mongoose.set("strictQuery", false);
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoUri);
        // await mongoose.connect(mongoUri, () => {
        //     console.log("connected to Mongo successfully");
        // })
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}
module.exports = connectToMongo;