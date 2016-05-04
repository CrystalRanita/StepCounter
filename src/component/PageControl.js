import SensorDataPageComponent from './SensorDataPageComponent';
import StartPageComponent from './StartPageComponent';

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

var ROUTE_STACK = [
  {name: 'StartPage', component: StartPageComponent, index: 0},
]

export default class PageControl extends Component {
  render() {
    return (
      <RouteNavigator style={styles.container}
          initialRouteStack={ROUTE_STACK}
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
    router.addRoute( 'StartPage', '/StartPage/:id', StartPageComponent, {
      defaultAnimation: Navigator.SceneConfigs.FadeAndroid,
    });

    //Sensor Data Page
    router.addRoute( 'SensorDataPage', '/SensorDataPage/', SensorDataPageComponent, {
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