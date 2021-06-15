const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./src/routes/api.routes')(app);

app.listen(3000, () => {
    console.log('http://localhost:3000/');
})