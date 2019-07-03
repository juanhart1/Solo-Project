const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    //Instead of .send use .sendFile
    res.sendFile('/Users/juanhart1/Documents/CSNYC/week_5/solo_project/src/index.html');
});

app.listen(3000);