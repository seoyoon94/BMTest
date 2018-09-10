const express = require('express')
const path = require('path')
const app = express()
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.render('test'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))