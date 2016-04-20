import C_Button from './C_Button';

import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';
var { RouteNavigator, Router } = require('react-native-route-navigator');

export default class P_StartPageComponent extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Adaptiv</Text>
            <Text> Called With ID: {this.query.id} </Text>
            <C_Button text="Get Sensor Data" onPress={
                this.goToPage.bind(this)
            }/>
          </View>
        );
    }

    goToPage() {
      this.props.nav.push('/P_SensorDataPage/')
    }

    get query() {
      return (this.state || {}).query || {};
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});