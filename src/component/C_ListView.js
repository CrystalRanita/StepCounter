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

export default class C_ListView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
      return (
          <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>}
          />
      );
    }

    _renderRows(rowData: string, sectionID: number, rowID: number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = {
            uri: THUMB_URLS[rowHash % THUMB_URLS.length],
        };
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    _genRows(pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        for (var i = 0; i<100; i++) {
            var pressedText = pressData[i] ? ' (pressed)' : '';
            dataBlob.push('Row' + i + pressedText);
        }
        return dataBlob;
    }
}