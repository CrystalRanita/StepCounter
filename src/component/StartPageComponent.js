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
                <Text style={styles.title}>Press NEXT</Text>
                <Button text="NEXT" onPress={
                    this.goToPage.bind(this)
                }/>
            </View>
        );
    }

    goToPage() {
      this.props.nav.push('/SensorDataPage/');
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    width: width,
    height: height,
  },
  title: {
    fontSize: width/15,
    textAlign: 'center',
    margin: 5,
    padding:0,
  },
});
