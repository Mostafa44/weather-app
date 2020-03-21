const request= require('request');

const geoCode=(address, callback)=>{
    let url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9zdGFmYTQ0OCIsImEiOiJjazd4bzdlNDkwMHM3M25td3d3NG93bHBmIn0.Ob-tz44YgHhwup7hXYJYGQ&limit=1`
    request({url, json:true}, (error, {body}={})=>{
       if (error){
          callback('Unable to connect to GeoCode service!', undefined);
       }else if(body.features.length === 0){
          callback('Unable to find the searched for location!', undefined);
       }else{
         // let longitude=response.body.features[0].center[0];
        //  let latitude=response.body.features[0].center[1];
          let location= body.features[0].place_name;
          const [longitude, latitude]=body.features[0].center;
          callback(undefined, {longitude, latitude, location}); 
       }
    });
 };

 module.exports= geoCode;