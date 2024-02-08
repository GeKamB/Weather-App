import axios from 'axios'

export function returnLocation(city) {
 return axios.get('https://geocoding-api.open-meteo.com/v1/search?&count=3&language=en&format=json', 
  { params: {
    name: city,
  }})
  .then(({ data }) => {    
    const ans = data.results
    return ans  
  })
};





