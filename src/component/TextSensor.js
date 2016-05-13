/**
* Crystal Lin 2016-04-07
 */

import React, {
    Component,
    StyleSheet,
    Text,
    InteractionManager,
    DeviceEventEmitter,
    Dimensions,
} from 'react-native';

var AdaptivCapture = require('./../../lib/components/AdaptivAndroid/AdaptivCapture.android.js');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class TextSensor extends Component {

    constructor(props){
        super(props);
        this.state = {
            Value: "None",
            Type: this.props.type,
        };
    }
  
    render() {
        const { type } = this.props;
        return (
            <Text style={styles.textStyle}>{this.state.Value}</Text>
        );
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => { 
            AdaptivCapture.startSensorCounter(500);  
            if(this.state.Type === "steps"){
                DeviceEventEmitter.addListener('StepCount', (data)=> {
                    this.setState({
                        Value: data.steps,
                    });
                    console.log('steps: ' + data.steps);
                });
            }else if(this.state.Type === "gps_status"){
                DeviceEventEmitter.addListener('GPS', (data)=> {
                    this.setState({
                        Value: data.gps_status,
                    });
                    console.log('GPS status: ' + data.gps_status);
                });
            }else if(this.state.Type === "x"){
                DeviceEventEmitter.addListener('Accelerometer',  (data) => {
                    this.setState({
                        Value: data.x,
                    });
                    console.log('x: ' + data.x);
                });
            }else if(this.state.Type === "y"){
                DeviceEventEmitter.addListener('Accelerometer',  (data) => {
                    this.setState({
                        Value: data.y,
                    });
                    console.log('y: ' + data.y);
                });
            }else if(this.state.Type === "z"){
                DeviceEventEmitter.addListener('Accelerometer',  (data) => {
                    this.setState({
                        Value: data.z,
                    });
                    console.log('z: ' + data.z);
                });
            }else if(this.state.Type === "bpm") {
                DeviceEventEmitter.addListener('BPM',  (data) => {
                    this.setState({
                        Value: data.bpm,
                    });
                    console.log('bpm: ' + data.bpm);
                });
            }
        });
    }

    componentWillUnmount() {
        InteractionManager.runAfterInteractions(() => {
            AdaptivCapture.stopSensorCounter();
            if(this.state.Type === "steps"){
                DeviceEventEmitter.removeAllListeners('StepCount');
                console.log("Unmount component StepCount.");
            }else if(this.state.Type === "gps_status"){
                DeviceEventEmitter.removeAllListeners('GPS');
                console.log("Unmount component GPS.");
            }else if((this.state.Type === "x") || (this.state.Type === "y")  || (this.state.Type === "z")){
                DeviceEventEmitter.removeAllListeners('Accelerometer');
                console.log("Unmount component Accelerometer.");
            }
        });

    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: width/20,
        textAlign: 'center',
        marginLeft: (width)/16,
    },
});