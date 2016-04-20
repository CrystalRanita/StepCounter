/**
* Crystal Lin 2016-04-07
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class C_Button extends Component {
  constructor(props){
    super(props);
    this.state = {disabled: false};
  }
  
onPress = () => {
    console.log(1);
    const {onPress} = this.props;
    this.disable();
    onPress(this.enable()); // asyncnonus. Notice: must be this.enable() not this.enable, otherwise enable function does not works.
    //this.enable();// asyncnonus, cannot write enabled code like this
  };
  enable = () => {
    console.log(4);
    this.setState({
      disabled: false,
    });
  };
  disable = () => {
    console.log(2);
    this.setState({
      disabled: true,
    });
  };
  render() {
    {/*ext here is deconstruction: const text = this.props.text*/}
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={this.state.disabled}
          style={[styles.button, this.state.disabled && styles.disabled]}
          /*self-define function myfunction = () => {}*/
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  disabled:{
    backgroundColor: 'gray',
  },
  button:{
    height: 80,
    width:280,
    borderRadius: 40,
    backgroundColor: '#808000',
    justifyContent:'center',
    overflow: 'hidden',
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});