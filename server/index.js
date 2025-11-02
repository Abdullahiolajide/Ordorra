const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
const mongoose = require('mongoose');
const auth = require('./routes/auth')
const productRoutes = require('./routes/products');
const storeInfos = require('./routes/storeInfos');
const subscriptionRoutes = require("./routes/subscription");
const cloudinaryRoutes = require("./routes/cloudinary")
const cookieParser = require("cookie-parser");
const paystackWebhook = require("./webhooks/paystack");

app.use(cookieParser());
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",       
  "https://ordorra.app",          
  "https://ordorra.vercel.app"    
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);


app.use('/api/auth', auth)
app.use('/api/products', productRoutes);
app.use('/api/store', storeInfos);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/webhooks", paystackWebhook);
app.use("/api/image", cloudinaryRoutes)
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});
app.use((req, res)=>{
    res.status(404).send('Page Not Found')
})


const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`server is listeneing  at ${PORT}`))
    }catch(error){
        console.log(error)
    }
}
start()