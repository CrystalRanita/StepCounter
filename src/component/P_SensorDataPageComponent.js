import C_Button from './C_Button';
import C_ListView from './C_ListView';
import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
  Dimensions,
} from 'react-native';
var { RouteNavigator, Router } = require('react-native-route-navigator');

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class P_SensorDataPageComponent extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Sensor Data</Text>
            <C_Button text="Start a New Capture" onPress={
                () => {alert('Start get sensor data...')}
            }/>
            <C_ListView></C_ListView>
            <C_Button text="Back to Start Page!" onPress={
              this.goBack.bind(this)
            }/>
          </View>
        );
    }

    goBack() {
        this.props.nav.pop();   
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    width: width,
    height: height,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});