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

export default class P_SensorDataPageComponent extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}> Page 2! </Text>
            <Text> Hello {this.props.name} </Text>
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