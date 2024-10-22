import { config } from "../configEnv.js";

console.log(config)

const options = {
    method: 'GET',
    credentials:'include' ,
  
    headers: {
        'Content-Type': 'application/ld+json'
        , 
    },
  };
  fetch( config.API_BASE_URL + config.API_PROTEC,options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
