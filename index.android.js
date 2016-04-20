/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import C_Button from './src/component/C_Button';
import C_Navigation from './src/component/C_Navigation';
import C_ToolbarAndroid from './src/component/C_ToolbarAndroid';
import P_PageControl from './src/component/P_PageControl';

var AdaptivCapture = require('./lib/components/AdaptivAndroid/AdaptivCapture.android.js')

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Navigator
} from 'react-native';

class StepCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: null,
            navigator: null
        };
    }

    static childContextTypes = {
      drawer: React.PropTypes.object,
      navigator: React.PropTypes.object
    };

    getChildContext = () => {
        return {
          drawer: this.state.drawer,
          navigator: this.state.navigator
        }
    };

    setDrawer = (drawer) => {
        this.setState({
          drawer
        });
    };

    render() {
      var width = 0
      var height = 0
      const {drawer, navigator} = this.state;
      const navView = React.createElement(C_Navigation);

      var navigationView = (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Step Counter</Text>
          </View>
      );
      return (

          <DrawerLayoutAndroid
              drawerWidth={200}
              drawerPosition={DrawerLayoutAndroid.positions.Left}
              renderNavigationView={
                  ()=> {
                      if(drawer && Navigator) {
                          return navView;
                      }
                      return null;
                  }
              }
              ref ={(drawer) => {!this.state.drawer?this.setDrawer(drawer):null}}
          >
              <View style={styles.containerMain}>
                  <C_ToolbarAndroid></C_ToolbarAndroid>
                  <P_PageControl></P_PageControl>
                  <C_Button text="Pass Data Test" onPress={() => {
                      AdaptivCapture.show(
                          width,
                          height,
                          (width, height) => {
                              alert('result' +  width +  height);
                          }
                      )
                  }}/>
              </View>
          </DrawerLayoutAndroid>
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
