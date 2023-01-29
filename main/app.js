
// const { getEnvironmentData } = require("worker_threads");

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

// Global variable declaration
const btn = document.getElementById('generate');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let zipValue = document.getElementById('zip').value;
const apiKey = '&appid=7d816eb10883189e39262125bb6e9e55&units=metric'
let feelingValue = document.querySelector('textarea').value

// Add Click event to the button
btn.addEventListener('click', action)

function action(e){
    zipValue = document.getElementById('zip').value;

    feelingValue = document.querySelector('textarea').value
    
    // Condition for Empty user input
    if (zipValue === ""){
        e.preventDefault()
        document.getElementById('zip').style.cssText = 'border: 3px solid red'
        let error1 = document.getElementById('error1')
        error1.innerHTML = 'Please Type the ZIP Code For The Required Country'
        error1.style.cssText = 'background-color: rgba(255, 0, 0, 60%); width: 370px ;height: 40px; font-size:15px;font-weight: bold; margin:5px auto;line-height: 2.5'
    }else if (feelingValue === "") {

        document.getElementById('zip').style.cssText = 'border: 3px solid black'
        error1.style.cssText = 'display: none;'
        // Calling Requests with Posting User Feelings
        console.log(baseURL+zipValue+apiKey)
        getData(baseURL,zipValue,apiKey)
        .then(function(data){
        postData('/postdata', {'City': data.name, 'Country': data.sys.country, 'Date': newDate, 'Temperature': data.main.temp});
        updateUI()
        })

    }else{
        document.getElementById('zip').style.cssText = 'border: 3px solid black'
        error1.style.cssText = 'display: none;'
        // Calling Requests without Posting User Feelings
        console.log(baseURL+zipValue+apiKey)
        getData(baseURL,zipValue,apiKey)
        .then(function(data){
            postData('/postdata', {'City': data.name, 'Country': data.sys.country, 'Date': newDate, 'Temperature': data.main.temp, 'Feelings': feelingValue});
            updateUI()
        })
    }
};

// Get Request function for API data
const getData = async(baseUrl,zipValue,apiKey)=>{
    // const response  = await fetch(url+zip+key);
    const response = await fetch (baseUrl+zipValue+apiKey)
    try{
        const data = await response.json();
        console.log(data)
        return data

    }catch(error){
        console.log('error', error)

    }
}


// Post request function to Local server
const postData = async(url = '', data = {})=>{

    console.log(data)

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const newData = await response.json()
        console.log(newData)
        
    }catch(error){
        console.log('error', error)

    };

}

// Get Request Function for updating User Interface
const updateUI = async ()=>{
    const response = await fetch('/all');
    try{
        const allData = await response.json();

        if(feelingValue === ""){
        document.getElementById('location').innerHTML = `Location for ZIP code is : ${allData.City}/${allData.Country}`
        document.getElementById('date').innerText = `Today's Date is: ${allData.Date}`
        document.getElementById('temp').innerText = `Temperature for choosen ZIP code is : ${Math.round(allData.Temperature)} degrees Celsius `

        }else{
            document.getElementById('location').innerHTML = `Location for ZIP code is : ${allData.City}/${allData.Country}`
            document.getElementById('date').innerText = `Today's Date is: ${allData.Date}`
            document.getElementById('temp').innerText = `Temperature for choosen ZIP code is : ${Math.round(allData.Temperature)} degrees Celsius `
            document.getElementById('content').innerText = `Your feelings is : ${allData.Feelings}`
        }
    }catch(error){
        console.log('error', error)
    }

}