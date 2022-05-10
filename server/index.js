const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
const bodyparser = require ("body-parser");//we use it as middleware
app.use(bodyparser.json());
// imposeer que chaque entre a l'api est sus format jason 
app.get('/', (req, res) => {
  res.send('bienvenu')
})
const postsRoute= require('./Routes/Post');
const userRoute=require ("./Routes/User");
app.use("/",postsRoute);
app.use("/user",userRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})