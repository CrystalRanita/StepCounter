import React, {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
  Component,
  Picker,
} from 'react-native';

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Modal>';
exports.description = 'Component for presenting modal views.';

export default class Button extends Component {
    constructor(props){
      super(props);
      this.state = {
        active: false,
      };
    }

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

export default class PopWindow extends Component {

    constructor(props){
      super(props);
      this.state = {
          modalVisible: false,
          transparent: false,
      };
    }

  _setModalVisible(visible) {
      this.setState({
          modalVisible: visible,
      });
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    var innerContainerTransparentStyle = {backgroundColor: 'seashell', padding: 20};

    return (
      <View>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Text >  
                  Test BPM 
                </Text>  
                <Picker  
                  prompt="Choose BPM"  
                  style={{width:200}}  
                  selectedValue={this.state.language}  
                  onValueChange={(value) =>this.setState({language: value})}>  
                  <Picker.Item  label="90 BPM" value="90 BPM" />  
                  <Picker.Item  label="100 BPM" value="100 BPM" />
                  <Picker.Item  label="110 BPM" value="110 BPM" />
                  <Picker.Item  label="120 BPM" value="120 BPM" />
                  <Picker.Item  label="130 BPM" value="130 BPM" />
                  <Picker.Item  label="140 BPM" value="140 BPM" />
                  <Picker.Item  label="150 BPM" value="150 BPM" />
                  <Picker.Item  label="160 BPM" value="160 BPM" />
                </Picker>  
                <Text>Selected BPM:{this.state.language}</Text>  
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
      </View>
    );
  }
}

exports.examples = [
  {
    title: 'Modal Presentation',
    description: 'Modals can be presented with or without animation',
    render: () => <ModalExample />,
  },
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});