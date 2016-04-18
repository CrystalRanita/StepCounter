/**
* Crystal Lin 2016-04-07
 */

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

export default class C_Toolbar extends Component {

    render() {
      return (
          <Icon.ToolbarAndroid
              title="Adaptiv"
              titleColor="green"
              navIconName="android-arrow-back"
              actions={[
                  { title: 'Settings', iconName: 'gear-a', iconSize: 30, show: 'always' },
                  { title: 'Follow me on Twitter', iconName: 'social-twitter', iconColor: "#4099FF", show: 'ifRoom' },
              ]}
              overflowIconName="more" 
          />
      );
    }
}