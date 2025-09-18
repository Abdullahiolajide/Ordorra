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
const paystackWebhook = require("./webhooks/paystack");
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', auth)
app.use('/api/products', productRoutes);
app.use('/api/store', storeInfos);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/webhooks", paystackWebhook);
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