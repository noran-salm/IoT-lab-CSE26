const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/slider', function (req, res) {
    const value = req.body.value;

    console.log('Received value from browser:', value);

    res.json({
        message: 'Value received successfully',
        value: value
    });
});

app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
});