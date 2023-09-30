//For the app, would need to program client frontends and HTML pages for various methods to return the data.

/**
 * I am not fully sure how we would use a database, but I am adding one anyways if we need to keep a log of data.
 * I learned a small amount of mongoDB, but would also want to learn mySQL or another structured database. 
*/
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const {Schema} = require('mongoose');


const PORT = process.env.PORT || 3000;
const CONN = process.env.CONN;

const robotSchema = new Schema({
    "responseTime": String,
    "motorRpm": String,
    "taskStatus": String
});

const Robot = mongoose.model('robot', robotSchema);

mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true });

const robot1 = new Robot({
    responseTime: 500,
    motorRpm: 2000
});

app.get('/', (req, res) => {
    res.send("Welcome to Nathanael's trial project.");
    //res.send({'robot': robot1});
});

//This get request occurs on the '/status' endpoint, and would return relevant data.
app.get('/api/status', (req, res)=> {
    res.json({ 
        status: "Online",
        responseTime: "A time"
    })
});

//This get request should return a database model.
app.get('/api/robot/:id', async (req, res) => {
    const robotId = req.params.id;
    const robotCall = await Robot.findById(robotId);
    res.send(robotCall);
})




app.head('/api/headers', (req, res) => {
    console.log(req.headers);
})



//app.put()


/**
 * Very important question: Why did express.json cause my post AND get requsts to timeout when I added it as middleware?
 * 
 * */
app.post('/api/robot',  express.json({type: '*/*'}), function(req, res){
    const newRobot = new Robot(req.body);
    newRobot.save();
    res.json(newRobot);
});

app.put('/api/robot/:id', express.json({type: '*/*'}), async function(req, res){
    const robotId = req.params.id;
    const result = await Robot.replaceOne({_id: robotId}, req.body);
    res.json({updatedCount: result.modifiedCount});
})

app.delete('/api/robot/:id', async function(req, res){
    const robotId = req.params.id;
    const result = await Robot.deleteOne({_id: robotId});
    res.json({deletedCount: result.deletedCount});
});





//The call for the app to listen, along with a console log as confirmation that it is active.
app.listen(PORT,function() {
    console.log(`Listening on http://localhost:${PORT}`)
})

