const express = require('express')
const mongodb = require("./db")

const app = express()
const port = 5000

mongodb();



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
app.use(express.json())
app.use('/api' , require("./Routes/CreateUser"))
app.use('/api' , require("./Routes/Displaydata"))
app.use('/api', require("./Routes/Orders"))

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error : false
  })
})


app.listen(port, () => {
  console.log(`Canteen app listening on port ${port}`)
})
