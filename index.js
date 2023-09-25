const express = require('express');
const PORT = 8080;
const app = express();

app.use(express.json())

app.get('/test', (req, res)=> {
    res.json({ 
        status: "Online",
        responseTime: "Sick"
    })
});

app.post('/test/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).json({ message: 'We need a logo!' })
    }

    res.json({
        tshirt: `shirt with your ${logo} and ID of ${id}`
    });
})







app.listen(PORT,function() {
    console.log(`Listening on http://localhost:${PORT}`)
})