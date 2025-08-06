const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
const mongoose = require('mongoose');
const auth = require('./routes/auth')
const productRoutes = require('./routes/products');
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', auth)
app.use('/api/products', productRoutes);
app.use((req, res)=>{
    res.status(404).send('Page Not Found')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})