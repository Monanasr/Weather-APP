projectData = {

}

const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------------------------------------------------


const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log('Server is running')
    console.log(`Running on localhost: ${port}`);
}

// ------------------------------------------------------------


app.use(express.static('main'))


// ------------------------------------------------------------




app.post('/postdata', function(req, res){
    
    projectData['City'] = req.body['City']
    projectData['Country'] = req.body['Country']
    projectData['Date'] = req.body['Date']
    projectData['Temperature'] = req.body['Temperature']
    projectData['Feelings'] = req.body['Feelings']

    console.log(projectData)

} )



app.get('/all', function(req,res){
    res.send(projectData)
})