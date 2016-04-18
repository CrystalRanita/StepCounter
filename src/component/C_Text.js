\/**
 * Created by Crystal on 2016/4/11.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class C_Text extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {textContent, textColor, textSize} = this.props;
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', color: this.props.textColor, fontSize: this.props.textSize}}>{this.props.textContent}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});