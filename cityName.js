function getCityName(latitude, longitude) {
    // Construct the API request URL
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    // Make the API request
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Parse the response and extract the city name
            const addressComponents = data.results[0].address_components;
            let cityName;
            for (const component of addressComponents) {
                if (component.types.includes('locality')) {
                    cityName = component.long_name;
                    break;
                }
            }
            console.log('City Name:', cityName);
        })
        .catch(error => {
            console.error('Error fetching city name:', error);
        });
}
