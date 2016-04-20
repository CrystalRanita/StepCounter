/**
* Crystal Lin 2016-04-19
 */

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid
} from 'react-native';

var Icon = require('react-native-vector-icons/EvilIcons');
export default class C_ToolbarAndroid extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {textContent} = this.props;

        return (
              <Icon.ToolbarAndroid
                  actions={toolbarActions}
                  navIconName='navicon'
                  style={styles.toolbar}>
                  <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{'Adaptiv'}</Text>
                  </View>
              </Icon.ToolbarAndroid>
        );
    }
}

var toolbarActions = [
  {title: 'Settings', iconName: 'gear', show: 'always', iconColor: '#ffffff', iconSize: 50},
  {title: 'Settings', iconName: 'question', show: 'always', iconColor: '#ffffff', iconSize: 50},
];

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#20b2aa',
        height: 56,
    },
});