import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {API_KEY} from '@env';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Teste!</Text>
      <Text>My API is {API_KEY}</Text>
      <StatusBar style="auto" />
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
});