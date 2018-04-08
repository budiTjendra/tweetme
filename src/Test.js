import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View} from 'react-native';

export default class Test extends Component {
  state = {
    modalVisible: false,
    title:'modal'
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderText(){
    if (this.state.modalVisible){
       setState({title: 'Modal Visible!'});
    }

    setState({title: 'Modal Hide!'});
  }
  render() {
    return (
      <View style={{marginTop: 22}}>
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Modal Dialog</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({title: 'hehehe'});
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>{this.state.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
