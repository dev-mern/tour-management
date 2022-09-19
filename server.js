const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI,{
    dbName: 'Unique_Questions',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connected!");
}).catch(err=>{
    console.log(err);
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Tour Server running on port ${port}`)
})