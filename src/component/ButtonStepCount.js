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

var AdaptivCapture = require('./../../lib/components/AdaptivAndroid/AdaptivCapture.android.js');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
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
        height: width/4,
        width: width/4,
        borderRadius: width/2,
        justifyContent:'center',
        overflow: 'hidden',
        marginLeft: (3*width)/8,
        marginTop: width/32,
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
        fontSize: width/15,
    },
});