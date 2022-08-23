const request = require("request");
const forecast = (x , y , callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=0d1c9f82cae52e58766a5738aac7ff60&query=${x},${y}&units=m`;
    request({url , json:true},(error, {body})=>{
        if(error){
            callback("Unable to connect to location services",undefined);
        }
        else if(body.error){
            callback("Unable to locate",undefined);
        }
        else {
           
            const forecast = `It is currently ${body.current.temperature} degrees and the precipitation is ${body.current.precip}`
            callback(error,forecast);
        }
        }      
    )}

module.exports=forecast;