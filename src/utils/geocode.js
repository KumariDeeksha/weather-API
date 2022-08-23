const request = require("request")

//geocoding service-it helps us change the place name into latitude and longitude

const geocode=(address,callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=8ba7d9f5ddd2ae720400658e3944adea`
    request({url,json:true},(error,{body})=>{
      if(error)
      {
           callback('unable to connect',undefined)
      }
     //  else if(body.features.length === 0){
     //      callback("Enter valid location",undefined);
     //  }
      else {
           callback(undefined,{
                 lat:body.coord.lat,
                 lon:body.coord.lon,
                 location:address
           })
      }
    })
    
  }
 module.exports=geocode;
