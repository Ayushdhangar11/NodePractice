const express = require('express')
const app = express()

// const myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   // not calling next(), not sending response
//   res.end("Middleware stopped here")
// }

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next(); // pass control to next middleware/route
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})