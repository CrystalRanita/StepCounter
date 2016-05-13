/**
* Crystal Lin 2016-04-07
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Button extends Component {
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
        <TouchableOpacity
          disabled={this.state.disabled}
          style={[styles.button, this.state.disabled && styles.disabled]}
          /*self-define function myfunction = () => {}*/
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  disabled:{
    backgroundColor: 'gray',
  },
  button:{
    height: width/4,
    width: width/4,
    borderRadius: width/2,
    backgroundColor: 'turquoise',
    justifyContent:'center',
    overflow: 'hidden',
    marginLeft: (3*width)/8,
    marginTop: width/32,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontSize: width/20,
  },
});