const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

app.use(cors());
app.use(express.json());
const { connection } = require("./db_connect");

connection();
const auth_router = require("./routes/auth.router")
const connection_router = require("./routes/connection.router")
const tweet_router = require("./routes/tweet.router")
const auth = require("./middleware/auth")

app.get('/', (req, res) => {
  res.send("Welcome to Twitter Api")
});

app.use('/auth', auth_router)
app.use('/connection',auth, connection_router)
app.use('/tweet',auth, tweet_router)

app.use((req, res) => {
  res.status(404).json({ sucess: false, message: "route not found on server please check" })
})

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found" })
})

app.listen(3000, () => {
  console.log('server started');
});



