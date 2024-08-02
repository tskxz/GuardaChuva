import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_KEY} from '@env';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const getWeather = async() => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=41.14&lon=-8.61&appid=${API_KEY}`
      const response = await fetch(url);
      const json = await response.json();
      weth = json.weather[0].main
      console.log(weth)
      setWeather(json.weather[0]);
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [])
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        weather ? (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>
              {weather.main === 'Rain' ? 'Traz guarda chuva! ☂️': 'Não é preciso guarda chuva! ❎'}
            </Text>
          </View>
        ) : null
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    fontSize: 18,
  },

  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },

  list: {
    flexGrow: 1,
    justifyContent: 'center',
  }


 
});