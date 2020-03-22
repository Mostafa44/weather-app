const request= require('request');
const forecast= (longitude, latitude, callback)=>{
    let url= `https://api.darksky.net/forecast/4fae6f186511d4db635e9f1a0274689d/${latitude},${longitude}?units=si`;
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather forecasting service',undefined);
        }else if(body.error){
            callback('error in the search criteria!', undefined);
        }else{
            callback(undefined,{ summary:body.daily.summary, 
                            highTemp:body.daily.data[0].temperatureMax,
                            lowTemp:body.daily.data[0].temperatureMin,
                            temperature:body.currently.temperature, 
                            rainingChance:body.currently.precipProbability});
        }
    });
}
module.exports=forecast;