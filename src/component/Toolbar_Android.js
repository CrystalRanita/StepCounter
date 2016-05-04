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
import BPM_Settings from './BPM_Settings';

export default class Toolbar_Android extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionText: "",
            iconType: "",
        }
    }
    render() {
        const {textContent} = this.props;
        if(this.state.iconType === "Settings"){
            showMenu = <BPM_Settings flag_modalVisible={true} ></BPM_Settings>;
        }else if(this.state.iconType === "Questions"){
            showMenu = alert('iconType: Questions');
        }else{
            showMenu = alert('iconType: None');
        }
        return (
            <View>
            <Icon.ToolbarAndroid
                actions={toolbarActions}
                navIconName='navicon'
                style={styles.toolbar}
                onActionSelected={this._onActionSelected}
            >
                <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
                </View>
            </Icon.ToolbarAndroid>
            {showMenu}
            </View>
        );
    }

    _onActionSelected = (position) => {
        console.log('position ' + position);
        this.setState({
            actionText: 'Selected ' + toolbarActions[position].title,
            iconType: toolbarActions[position].title,
        });
    };
}
var toolbarActions = [
    {title: 'Settings', iconName: 'gear', show: 'always', iconColor: '#ffffff', iconSize: 55},
    {title: 'Questions', iconName: 'question', show: 'always', iconColor: '#ffffff', iconSize: 55},
];

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#20b2aa',
        height: 56,
    },
});