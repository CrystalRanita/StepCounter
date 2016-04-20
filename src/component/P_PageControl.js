import P_SensorDataPageComponent from './P_SensorDataPageComponent';
import P_StartPageComponent from './P_StartPageComponent';

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

export default class P_PageControl extends Component {
  render() {
    return (
      <RouteNavigator style={styles.container}
          initialRouteStack={['/P_StartPage/my-id-string']}
                     router={this.router}
                        app={this}
      />
    );
  }

  get router() {
    if ( !this._router ) {
      this._router = new Router();
      this.addRoutes(this._router);
    }
    return this._router;
  }

  addRoutes(router) {
    //Define route here

    //Start Page
    router.addRoute( 'P_StartPage', '/P_StartPage/:id', P_StartPageComponent, {
      defaultAnimation: Navigator.SceneConfigs.FadeAndroid,
    });

    //Sensor Data Page
    router.addRoute( 'P_SensorDataPage', '/P_SensorDataPage/', P_SensorDataPageComponent, {
      defaultAnimation: Navigator.SceneConfigs.FloatFromRight,
      props: {
        name: 'Ranita',
        didPressButton: () => alert('Action from my app!')
      }
    });
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