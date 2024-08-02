import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { API_KEY } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (latitude, longitude) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();
      setWeather(json.weather[0]);
      setTemperature(json.main.temp);
      setLocation(json.name);
    } catch (error) {
      setError('Error fetching weather data');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      getWeather(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      setError('Error fetching location data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getBackgroundImage = () => {
    if (weather) {
      switch (weather.main) {
        case 'Rain':
          return require('./assets/rain.png');
        case 'Clear':
          return require('./assets/clear.png');
        case 'Clouds':
          return require('./assets/clouds.png');
        default:
          return require('./assets/default.png');
      }
    }
    return require('./assets/default.png');
  };

  const getWeatherIcon = () => {
    if (weather) {
      switch (weather.main) {
        case 'Rain':
          return 'weather-rainy';
        case 'Clear':
          return 'weather-sunny';
        case 'Clouds':
          return 'weather-cloudy';
        default:
          return 'weather-partly-cloudy';
      }
    }
    return 'weather-partly-cloudy';
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={getBackgroundImage()} style={styles.background}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          weather && (
            <View style={styles.weatherContainer}>
              <MaterialCommunityIcons name={getWeatherIcon()} size={100} color="white" />
              <Text style={styles.temperatureText}>{temperature}°C</Text>
              <Text style={styles.locationText}>{location}</Text>
              <Text style={styles.weatherText}>
                {weather.main === 'Rain' ? 'Traz guarda chuva! ☂️' : 'Não é preciso guarda chuva! ❎'}
              </Text>
            </View>
          )
        )}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 48,
    color: 'white',
  },
  locationText: {
    fontSize: 32,
    color: 'white',
  },
  weatherText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
