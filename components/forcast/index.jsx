import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import wind from "../../assets/icons/wind.png"
import drop from "../../assets/icons/drop.png"
import sunIcon from "../../assets/icons/sunIcon.png"
import calendar from "../../assets/icons/calendar.png"
import { Theme } from '../../theme';

export default function Forcast({ weatherData }) {

    const { location, current } = weatherData

    console.log("weatherData", weatherData)
    if (!weatherData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.ForcastContainer}>
            <View style={styles.TopHeading}>

                <Text style={styles.CityName}>
                    {location?.name},
                </Text>
                <Text style={styles.CountryName}>
                    {" " + location?.country}
                </Text>
            </View>
            <Image style={styles.MainSun} source={{ uri: 'https://' + current?.condition?.icon }} alt={'Main Sun'} />
            <Text style={styles.degree}>{current?.temp_c}&#176;</Text>
            <Text style={styles.cloudy}>{current?.condition?.text}</Text>

            <View style={styles.details}>
                <View style={styles.windView}>
                    <Image style={styles.windIcon} source={wind} alt={'wind'} />
                    <Text style={styles.windText}>{current?.wind_kph}km</Text>
                </View>
                <View style={styles.dropView}>
                    <Image style={styles.dropIcon} source={drop} alt={'drop'} />
                    <Text style={styles.dropText}>{current?.humidity}%</Text>
                </View>
                <View style={styles.timingView}>
                    <Image style={styles.timingIcon} source={sunIcon} alt={'sunIcon'} />
                    <Text style={styles.timingText}>{weatherData?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                </View>
            </View>

            {/* daily forcast */}
            <View style={styles.DForecastConatainer}>

                <View style={styles.DForecastView}>
                    <Image style={styles.calendarIcon} source={calendar} alt={'calendar'} />
                    <Text style={styles.DForecastText}>Daily Forecast</Text>
                </View>


                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.allDaysContainer}>
                        {weatherData?.forecast?.forecastday?.map((data, index) => {

                            const date = new Date(data.date)
                            let options = { weekday: 'long' }
                            let dayName = date.toLocaleDateString('en-US', options)
                            return (

                                <View key={index} style={styles.allDaysView}>
                                    <Image style={styles.weatherIcon} source={{ uri: 'https:' + data?.day?.condition?.icon }} alt={'rain'} />
                                    <Text style={styles.daysText}>{dayName}</Text>
                                    <Text style={styles.daysDegree}>{data?.day?.avgtemp_c}&#176;</Text>
                                </View>
                            )

                        })}

                    </View>
                </ScrollView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    ForcastContainer: {
        flex: 1,
        marginTop: 60,
        alignItems: "center",

    },
    TopHeading: {
        flexDirection: "row",
        alignItems: "center",
    },
    CityName: {
        color: "white",
        fontSize: 34,
        fontWeight: 'bold'
    },
    CountryName: {
        color: "white",
        fontSize: 32,
    },
    MainSun: {
        height: 150,
        width: 150,
        marginTop: 50,
    },
    degree: {
        color: "white",
        fontSize: 60,
        marginTop: 30,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    cloudy: {
        color: "white",
        fontSize: 26,
        marginTop: 5,
    },
    details: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        marginTop: 50,
        padding: 30,
    },
    windView: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 10,
    },
    dropView: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 10,
    },
    timingView: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 10,
    },
    windIcon: {
        height: 40,
        width: 40,
    },
    dropIcon: {
        height: 40,
        width: 40,
    },
    timingIcon: {
        height: 40,
        width: 40,
    },
    windText: {
        color: "white",
        fontSize: 22,
    },
    dropText: {
        color: "white",
        fontSize: 22,
    },
    timingText: {
        color: "white",
        fontSize: 22,
    },
    DForecastConatainer: {
        padding: 20,
        flexDirection: 'column',
        gap: 14,
        width: '100%',

    },
    DForecastView: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 14,
    },
    calendarIcon: {
        height: 40,
        width: 40,
    },
    DForecastText: {
        color: "white",
        fontSize: 22,
    },
    allDaysContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 14,
    },
    allDaysView: {
        backgroundColor: Theme.bgWhite(0.2),
        flexDirection: 'column',
        alignItems: "center",
        gap: 14,
        padding: 14,
        width: 150,
        borderRadius: 22,
    },
    weatherIcon: {
        width: 80, // Adjust to your needs
        height: 80,
        resizeMode: 'contain', // Ensures the image scales correctly
    },

    daysText: {
        color: "white",
        fontSize: 20,
    },
    daysDegree: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold'
    },
});

