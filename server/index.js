const connectToMongo = require('./db');
const express = require('express')

connectToMongo();


const app = express()
const port = 5000

// if you want to use req.body then you have to use a middle wear. like used below...

app.use(express.json())

// app.get('/', (req, res) => { 
//     res.send('Hello subrat!')
// })


//Available Routes..
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})