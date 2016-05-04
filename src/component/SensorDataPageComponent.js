import ButtonStepCount from './ButtonStepCount';
import Button from './Button';
import TextSensor from './TextSensor';


import React, {
    Component,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native';

var { RouteNavigator, Router } = require('react-native-route-navigator');

var IMG_LIST = [
    require('./../img/speech-balloon-orange-x-icon.png'), //Alphabet X
    require('./../img/speech-balloon-orange-y-icon.png'), //Alphabet Y
    require('./../img/speech-balloon-orange-z-icon.png'), //Alphabet Z
    require('./../img/step.png'), 
    require('./../img/gps.png'),
];

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class SensorDataPageComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Sensor Data</Text>
            <ButtonStepCount StartText="Start a New Capture" StopText="Stop Capture" onPress={() => {
            }}/>

            <View style={styles.dataStyle}>
                <TextSensor type="bpm"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
                <Image style={styles.rowImgStyle} source={IMG_LIST[0]} />
                <TextSensor type="x"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
                <Image style={styles.rowImgStyle} source={IMG_LIST[1]} />
                <TextSensor type="y"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
                <Image style={styles.rowImgStyle} source={IMG_LIST[2]} />
                <TextSensor type="z"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
                <Image style={styles.rowImgStyle} source={IMG_LIST[3]} />
                <TextSensor type="steps"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
                <Image style={styles.rowImgStyle} source={IMG_LIST[4]} />
                <TextSensor type="gps_status"></TextSensor>
            </View>

            <View style={styles.dataStyle}>
            </View>
            <Button text="Back to Start Page!" onPress={
              this.goBack.bind(this)
            }/>
          </ScrollView>
        );
    }

    goBack() {
        this.props.nav.pop();   
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
        width: width,
        height: height,
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    dataStyle: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'lightyellow',
    },
    rowImgStyle: {
        width: 50,
        height: 50,
    },
});