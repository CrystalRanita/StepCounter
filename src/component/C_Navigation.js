/**
* Crystal Lin 2016-04-14
 */

import React, {
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Image,
} from 'react-native';

/*http://react-native-material-design.github.io*/
import {
    Avatar,
    Drawer,
    Divider,
    COLOR,
    TYPO,
    Icon,
} from 'react-native-material-design';

export default class C_Navigation extends Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {route: null}
    }
  
    changeScene = (path, name) => {
        const { drawer, navigator } = this.context;

        this.setState({
            route: path
        });

        navigator.to(path, name);
        drawer.closeDrawer();
    };

    render() {
        const { route } = this.state;

        return (
            <Drawer theme='light'>
                <Drawer.Header image={<Image source={require('./../img/mickey.png')} />}>
                    <View style={styles.header}>
                        <Avatar size={80} image={<Image source={require('./../img/frog.png')} />} />
                        <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Options List</Text>
                    </View>
                </Drawer.Header>

                <Drawer.Section
                    items={[{
                        icon: 'home',
                        value: 'Rana Casa',
                        active: !route || route === 'welcome',
                        onPress: () => thie.changeScene('welcome'),
                        onLongPress: () => thie.changeScene('welcome')
                    }]}
                />
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    textTitle:{
      fontSize: 40,
      fontWeight: 'bold',
      color: '#191970',
      textAlign: 'center',
    },
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
});
