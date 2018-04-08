/* @flow weak */

import React , { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { showAddTweetDialog, messageChanged, addMessage } from '../actions';
import { Layout, Section, Button } from '../components/common';

class TweetAddDialog extends Component {

    postMessage(){
      const { tweet, addMessage } = this.props;
      addMessage(tweet.message);
    }



    render (){
      console.log('TweetAddDialog: props:', this.props);

      return(

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.tweet.isShowTweetDialog}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>

          <Layout style={styles.container}>
            <Section noSkin >
              <View style={styles.actionBarStyle}>
                  <Button onPress={ () => {this.props.showAddTweetDialog(false)} }><Text>close</Text></Button>
                  <Button onPress={this.postMessage.bind(this) }><Text>post</Text></Button>
              </View>
            </Section>
            <Section style={{flex:1}}>
              <TextInput
                  onChangeText={ (text) => {
                    this.props.messageChanged(text);
                  }}
                  placeholder='What is happening?'
                  multiline = {true}
                  value={this.props.message}
              />
            </Section>
          </Layout>

        </Modal>
      );
    };
}

const mapStateToProps = ({tweet}) => {

   return { tweet };
};

export default connect(mapStateToProps,
  {
    showAddTweetDialog,
    messageChanged,
    addMessage
  })(TweetAddDialog);

const styles = StyleSheet.create({
  container: {
    backgroundColor:'gray',
    marginTop:5
  },
  actionBarStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
