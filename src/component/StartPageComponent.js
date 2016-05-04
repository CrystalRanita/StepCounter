import Button from './Button';

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
var AdaptivCapture = require('./../../lib/components/AdaptivAndroid/AdaptivCapture.android.js');

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class StartPageComponent extends Component {
    render() {
        var width = 0
        var height = 0
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Adaptiv</Text>
                <Text> Called With ID: {this.query.id} </Text>
                <Button text="Get Sensor Data" onPress={
                    this.goToPage.bind(this)
                }/>
                <Button text="Pass Data Test" onPress={() => {
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

    goToPage() {
      this.props.nav.push('/SensorDataPage/');
    }

    get query() {
      return (this.state || {}).query || {};
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
    padding:0,
  },
});
