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

var AdaptivCapture = require('./../../lib/components/AdaptivAndroid/AdaptivCapture.android.js');

export default class ButtonStepCount extends Component {
    constructor(props){
        super(props);
        this.state = {
            running: false,
        };
    }
  
    onPress = () => {
        console.log("Step count button pressed...");
        const {onPress} = this.props;

        if (this.state.running) {
            this.SetStepCountStatus(true);
            this.setState({
                running: false
            });
            return;
        }

        this.setState({
            running: true,
        });
        this.SetStepCountStatus(false);
    };

    SetStepCountStatus = (stopped) => {
        console.log("Step count status: " + (stopped ? 'Stop' : 'Start'));
        AdaptivCapture.StepCount(stopped);
    };

    render() {
        let style = this.state.running ?   styles.onButtonStop : styles.onButtonStart
        const { StartText, StopText } = this.props;
        return (
            <TouchableOpacity
              style={[styles.button, style]}
              onPress={this.onPress}
            >
                <Text style={styles.buttonText}>{this.state.running ? this.props.StopText : this.props.StartText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        height: 50,
        width:200,
        borderRadius: 40,
        justifyContent:'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        marginBottom: 5,
        marginTop: 5,
    },
    onButtonStop:{
        borderColor: 'gold',
        backgroundColor: 'lightcoral',
    },
    onButtonStart:{
        borderColor: 'lightseagreen',
        backgroundColor: 'lightblue',
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
});