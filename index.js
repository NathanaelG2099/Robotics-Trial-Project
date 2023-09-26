//For the app, would need to program client frontends and HTML pages for various methods to return the data.

const express = require('express');
const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Nathanael's trial project.");
});

//This get request occurs on the '/status' endpoint, and would return relevant data.
app.get('/status', (req, res)=> {
    res.json({ 
        status: "Online",
        responseTime: "A time"
    })
});

//app.head('/path', (req, res) => {
    /**
     * this method would be able to return the headers, or use methods to return the contents of the headers, 
     * but I am kind of confused on headers. If I am reading into this correctly, would I need to create my headers when the user 
     * first launches the app, grabbing things like device language, cookies, and IP?
     */
//})


//app.put()


/**This was an example post method I tried on the internet to get it working. The ':id' endpoint allows for a parameter to 
 * be inputted, while the variable 'logo' would be an input from the HTML page through a body tag (Hence req.body). This may be more for the page 
 * maintanence side of web-development, but I also read that status tags would be useful for understanding what is happening
 * on requests. 100's are for information responses, 200's are for correctly working requests, 300's are redirects, 400's are for 
 * client-side errors, and 500's are for server-side errors. 
 * 
 * */
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






//The call for the app to listen, along with a console log as confirmation that it is active.
app.listen(PORT,function() {
    console.log(`Listening on http://localhost:${PORT}`)
})