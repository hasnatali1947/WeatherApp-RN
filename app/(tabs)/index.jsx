import { StyleSheet, View } from 'react-native';
import HomeScreen from '../../components/home';

export default function Main() {
  return (
    <View style={styles.Container}>
      <HomeScreen />
    </View>

  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  
});
