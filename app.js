const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/:userid', function(req, res) {
    res.render('index', {data : {userid: req.params.userid}});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});