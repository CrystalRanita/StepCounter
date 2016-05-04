/**
* Crystal Lin 2016-04-15
 */

import React, {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Component,
} from 'react-native';

var IMG_LIST = [
    require('./../img/speech-balloon-orange-x-icon.png'), //Alphabet X
    require('./../img/speech-balloon-orange-y-icon.png'), //Alphabet Y
    require('./../img/speech-balloon-orange-z-icon.png'), //Alphabet Z
];

export default class ListView extends Component {
    constructor(props){
        super(props);
        this.onAccelerometerChange = this.onAccelerometerChange.bind(this);
        this.onStepsChange = this.onStepsChange.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['0.0', '0.0','0.0','Our Steps: 0.0','GPS StatusNo Connection']),
        };

    }

    _renderRow(rowData: string, sectionID: number, rowID: number) {
        var rowImg = IMG_LIST[rowID];
        return (
            <TouchableHighlight>
                <View>
                    <View style={styles.rowViewStyle}>
                        <Image style={styles.rowImgStyle} source={rowImg} />
                        <Text style={styles.rowTextStyle}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                initialListSize={5}
                pageSize={1}
                renderRow={this._renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    rowViewStyle: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightyellow',
    },
    rowImgStyle: {
        width: 50,
        height: 50,
    },
    rowTextStyle:{
        flex:1,
        fontSize:20,
        color:'black'
    },  
});