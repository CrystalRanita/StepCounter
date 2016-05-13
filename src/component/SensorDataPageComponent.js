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
            <ButtonStepCount StartText="START" StopText="STOP" onPress={() => {
            }}/>

            <View style={styles.dataStyle}>
                <Text style={styles.bpm_text_style}>BPM: </Text>
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
            
            <Button text="SETTINGS" onPress={
                this.goToSettingsPage.bind(this)
            }/>

            <Button text="BACK" onPress={
                this.goBack.bind(this)
            }/>

          </ScrollView>
        );
    }

    goBack() {
        this.props.nav.pop();   
    }

    goToSettingsPage() {
        this.props.nav.push('/SettingsPage/');
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
        width: width,
        height: height,
    },
    title: {
        fontSize: width/15,
        marginLeft: (3*width)/8,
    },
    dataStyle: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'lightyellow',
    },
    rowImgStyle: {
        width: width/12,
        height: width/12,
        marginLeft: width/8,
    },
    bpm_text_style: {
        fontSize: width/15,
        marginLeft: width/8,
        color: 'orangered',
    },
});