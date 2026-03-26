const express = require('express')
const routes = require('./routes/index')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use('/api', routes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(`Triggered error : ${err.stack}`)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(port, () => {
    console.log(`Server started running on port ${port}`)
})

module.exports = app