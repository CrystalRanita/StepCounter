/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import PageControl from './src/component/PageControl';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class StepCounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
          <View style={styles.containerMain}>
              <PageControl></PageControl>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: 'lightyellow',
      width: width,
      height: height,
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
