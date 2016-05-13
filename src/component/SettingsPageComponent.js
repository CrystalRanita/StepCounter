import Button from './Button';
import BPM_Settings from './BPM_Settings';

import React, {
    Component,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Dimensions,
    ScrollView,
} from 'react-native';

var { RouteNavigator, Router } = require('react-native-route-navigator');

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class SettingsPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FlagShowBPM: false,
        }
    }

    render() {
        if(this.state.FlagShowBPM){
            showMenu = <BPM_Settings flag_modalVisible={true} ></BPM_Settings>;
        }else{
            showMenu = null;
        }
        return (
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button text="SET BPM" onPress={ () => {
                    this.setState({
                        FlagShowBPM: true,
                    });
                }
            }/>
            {showMenu}
            <Button text="BACK" onPress={
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
    },
    title: {
        fontSize: width/15,
        marginLeft: (3*width)/8,
    },
});