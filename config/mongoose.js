const mongoose=require('mongoose');

//Establishing the connection to the mongoose
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    console.log("Connected to the mongoose atlas!");
})
.catch((error)=>console.log("Listen nhi ho rha h!",error.message));
