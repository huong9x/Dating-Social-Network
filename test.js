import HaversineGeolocation from 'haversine-geolocation';

 
HaversineGeolocation.isGeolocationAvailable()
    .then(data => {
        const currentPoint = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            accuracy: data.coords.accuracy
        };
        console.log(currentPoint);
    });


