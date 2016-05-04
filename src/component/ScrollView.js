\/**
* Crystal Lin 2016-05-03
 */

import React, {
    Image,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';

var IMG_LIST = [
    require('./../img/speech-balloon-orange-x-icon.png'), //Alphabet X
    require('./../img/speech-balloon-orange-y-icon.png'), //Alphabet Y
    require('./../img/speech-balloon-orange-z-icon.png'), //Alphabet Z
];

export default class Row extends Component {
    _onClick() {
        this.props.onClick(this.props.data);
    }

    render() {
      return (
       <TouchableOpacity onPress={this._onClick} >
          <View style={styles.itemWrapper}>
            <Text>
                {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
}

export default class C_ScrollView extends Component {
    constructor(props){
      super(props);
      this.state = {
          X: 0,
          Y: 0,
          Z: 0,
          Steps: 0,
          GPS: "Disconnected",

          isRefreshing: false,
          rowData: Array.from(new Array(5)).map(
              (rowValue, rowID) => ({text: 'Initializing...row: ' + rowID, clicks: 0})),
      };
    }

    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true,
        });
        setTimeout(() => {

            const rowData = Array.from(new Array(5))
            .map((rowValue, rowID) => (
                {
                    text: rowValue,
                    clicks: 0,
                }
            ))
            .concat(this.state.rowData);

            this.setState({
              isRefreshing: false,
              rowData: rowData,
            });
        }, 5000);
    }


    render() {
      const rows = this.state.rowData.map((rowData, rowID) => {
        return <Row key={rowID} data={rowData} onClick={this._onClick}/>;
      });

      return (
        <ScrollView 
            style={styles.verticalScrollView}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />
            }
        >
            {rows}
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  verticalScrollView: {
    margin: 10,
  },
  itemWrapper: {
    backgroundColor: 'mistyrose',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'lightskyblue',
    padding: 10,
    margin: 1,
    flexDirection: 'row',
  },
  rowImgStyle: {
      width: 50,
      height: 50,
  },
});