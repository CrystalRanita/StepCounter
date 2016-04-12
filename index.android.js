/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Button from './src/component/Button';

var StdToastAndroid = require('./lib/components/StdToastAndroid/StdToast.android.js')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class StepCounter extends Component {
  render() {
    return (
      <View style={styles.containerMain}>
          <Text style={styles.textTitle}>{"Adaptiv"}</Text>
          <Text style={styles.textSubitem}>{"Average Pace"}</Text>
          <Text style={styles.textSubitem}>{"Distance"}</Text>

          <Button text="Get Sensor Data" clickBtnEvent={() => {StdToastAndroid.show('HiHi', StdToastAndroid.LONG)}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#afeeee',
  },
  textTitle:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#191970',
    textAlign: 'center',
  },
  textSubitem:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191970',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('StepCounter', () => StepCounter);
