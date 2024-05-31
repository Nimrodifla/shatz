const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const htmls_path = __dirname + '/htmls/';
const scripts_path = __dirname + '/scripts/';
const styles_path = __dirname + '/styles/';

app.get('/', (req, res)=>{
    res.sendFile(htmls_path + '/index.html');
});

app.get('/style.css', (req, res)=>{
    res.sendFile(styles_path + '/style.css');
});

app.get('/script.js', (req, res)=>{
    res.sendFile(scripts_path + '/script.js');
});

app.listen(PORT, (err) => {
    if (err)
        throw err;

    console.log("App is running");
});