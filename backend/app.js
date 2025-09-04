const express = require('express')
const app = express();
const cors = require('cors');
const router = require('./routes/payments.routes');
const port =  4000 ;

app.use(express.json())
app.use(cors());
app.use('/api',router)

app.get('/',(req, res)=>{
  res.send("hello");
})

app.listen(port , ()=>{
  console.log('server running on port', port)
})