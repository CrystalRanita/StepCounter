/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Button from './src/component/Button';

var AdaptivCapture = require('./lib/components/AdaptivAndroid/AdaptivCapture.android.js')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class StepCounter extends Component {
  render() {
    var width = 0
    var height = 0
    return (
      <View style={styles.containerMain}>
          <Text style={styles.textTitle}>{"Adaptiv"}</Text>
          <Text style={styles.textSubitem}>{"Average Pace"}</Text>
          <Text style={styles.textSubitem}>{"Distance"}</Text>

          <Button text="Get Sensor Data" clickBtnEvent={() => {
              AdaptivCapture.show(
                  width,
                  height,
                  (width, height) => {
                      alert('result' +  width +  height);
                  }
              )
          }}/>
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
