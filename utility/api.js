import axios from 'react-native-axios';

const apiKey = '9ab08d2d5cd742cba1a162833241611'

const forecastEndPoint = (params) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&${params.days}=1&aqi=no&alerts=no`
const locationEndPoint = () => `https://api.weatherapi.com/v1/search.json?key=${apiKey}`

export const FetchForecast = async () => {

    try {
        const response = await axios.get(forecastEndPoint)
        console.log(response);
        return response.data
    } catch (error) {
        console.error(error);
        console.log("error", error);
        throw error;
    }
}
export const FetchLocation = async () => {

    try {
        const response = await axios.get(locationEndPoint)
        console.log(response);
        return response.data
    } catch (error) {
        console.error(error);
        console.log("error", error);
        throw error;
    }
}
