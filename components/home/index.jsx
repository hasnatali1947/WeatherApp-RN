import { Image, StyleSheet, View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import SearchIcon from '../../assets/icons/SI.png';
import locationIcon from '../../assets/icons/locIcon.png';
import { useState } from 'react';
import Forcast from '../forcast';
import { debounce } from 'lodash'
import { useEffect } from 'react';
import { useCallback } from 'react';
import axios from 'react-native-axios';
import * as Progress from 'react-native-progress';
import { getData, storeData } from '../../utility/asyncStorage';

export default function HomeScreen() {

    const [showSearch, setShowSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [getLocation, setGetLocation] = useState([])
    const [weatherData, setWeatherData] = useState({})
    const [locations, setLocations] = useState([1, 2, 3])

    const apiKey = '9ab08d2d5cd742cba1a162833241611'

    const forecastEndPoint = (params) =>
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

    const locationEndPoint = (query) => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

    const handleSearch = async (value) => {
        console.log("value 1", value);
        try {
            console.log("value 2", value);
            const response = await axios.get(locationEndPoint(value))
            setGetLocation(response.data)
            console.log("response", getLocation);
            return response.data
        } catch (error) {
            console.error(error);
            console.log("error", error);
            throw error;
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1000), [])

    const handleLocation = async (loc) => {
        setGetLocation([])

        try {
            setLoading(true)
            const response = await axios.get(forecastEndPoint({ cityName: loc.name, days: 7 }))
            const data = response.data
            console.log("Forcast weather :: ", data);
            setWeatherData(data)
            storeData("city", loc.name)
            setLoading(false)
            setShowSearch(false)
            return data
        } catch (error) {
            console.error(error);
            console.log("error", error);
            throw error;
        }
    }

    const weatherFirstDisplay = async () => {

        try {
            let city = await getData('city')
            let cityName = 'islamabad'
            if(city){
                cityName = city
            }

            const response = await axios.get(forecastEndPoint({ cityName, days: 7 }))
            const data = response.data
            setWeatherData(data)
            setShowSearch(false)
            return data
        } catch (error) {
            console.error(error);
            console.log("error", error);
            throw error;
        }
    }
    useEffect(() => {
        weatherFirstDisplay()
    }, [])

    return (

        <View style={styles.Container}>
            <StatusBar style="light" />

            <Image
                blurRadius={70}
                source={require('@/assets/images/weatherAppBg.jpg')}
                style={styles.backgroundImage}
            />
            {loading ?
                (
                    <View style={styles.centeredContainer}>
                        <Progress.CircleSnail thickness={10} size={140}  color="#0bb3b2" />
                    </View>
                )
                :
                (
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.inputContainer}>
                            <View style={[styles.inputView, { backgroundColor: showSearch ? Theme.bgWhite(0.2) : "transparent" }]}>

                                < TextInput
                                    style={[styles.searchInput, {display: showSearch ? "flex" : "none"}]}
                                    onChangeText={handleTextDebounce}
                                    placeholder="Search City"
                                placeholderTextColor="lightgray"
                                />
                                <TouchableOpacity style={styles.searchbtn}
                                    onPress={() => setShowSearch(!showSearch)}
                                >
                                    <Image
                                        source={SearchIcon}
                                        alt="seach Icon"
                                        style={{ width: "24", height: "24" }}
                                    />

                                </TouchableOpacity>


                            </View>
                            <TouchableOpacity style={styles.locationsContainer}>
                                {locations.length > 0 && showSearch ?
                                    <View>
                                        {getLocation?.map((loc, index) => (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(loc)}
                                                style={[
                                                    styles.locationsView,
                                                    index !== getLocation.length - 1 && styles.borderBottom
                                                ]}
                                                key={index}>
                                                <Image
                                                    source={locationIcon}
                                                    alt="Location Icon"
                                                    style={{ width: "24", height: "24" }}
                                                />
                                                <Text style={styles.locations}>
                                                    {loc.name} {loc.country}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    : null
                                }
                            </TouchableOpacity>
                            <Forcast weatherData={weatherData} />
                        </View>
                    </SafeAreaView>
                )
            }


        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    centeredContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        // backgroundColor: '#f0f0f0', 
    },
    safeArea: {
        flex: 1,
        marginTop: 35,

    },
    inputContainer: {
        flex: 1,
        height: "7%",
        margin: "10",

    },
    inputView: {
        width: "100%",
        flexDirection: 'row',
        borderRadius: 55,
        position: "relative",
        height: 60,
    },
    searchInput: {
        flex: 1,
        padding: 20,
        borderRadius: 40,
        fontSize: 18,
        color: "white",
    },
    searchbtn: {
        position: "absolute",
        width: 60,
        height: 60,
        backgroundColor: Theme.bgWhite(0.3),
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: '50%',
        transform: [{ translateY: -30 }],
    },
    locationsContainer: {
        backgroundColor: Theme.bgWhite(0.9),
        borderRadius: 30,
        marginTop: 70,
        position: "absolute",
        width: "100%",
        flex: 1,
        zIndex: 1
    },

    locationsView: {
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        padding: 12,
    },

    locations: {
        flex: 1,
        width: 100,
        fontSize: 18,
        color: "white",
        padding: 10,
        color: "rgba(0, 0, 0, 0.9)"
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
});
