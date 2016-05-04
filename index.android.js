/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import Toolbar_Android from './src/component/Toolbar_Android';
import PageControl from './src/component/PageControl';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class StepCounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
          <View style={styles.containerMain}>
              <Toolbar_Android></Toolbar_Android>
              <PageControl></PageControl>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      backgroundColor: 'lightyellow',
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
