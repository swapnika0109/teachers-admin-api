const express = require('express')
const routes = require('./routes/index')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use('/api', routes)


app.use((err, req, res, next) => {
  console.error(`Triggered error : ${err.stack}`)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, ()=>{
    console.log(`Server started running on port ${PORT}`)
})

module.exports = app