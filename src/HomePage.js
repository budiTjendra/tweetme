/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  RefreshControl,
  Alert,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import { getUserTimeline, showAddTweetDialog, addMessage , messageChanged ,resetError} from './actions';
import { Layout, Section, Button } from './components/common';
import TweetAddDialog from './components/TweetAddDialog';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh(){
    this.setState({ refreshing: true });

    const { getUserTimeline } = this.props;
    getUserTimeline();
  }

  componentDidMount(){
    console.log('home: componentDidMount: ',this.props);
    const { getUserTimeline, tweet } = this.props;
    getUserTimeline();

  }

  renderTimeline(){
    console.log('test:',this.props.tweet.timeline);
        return this.props.tweet.timeline.map(
           item =>
             <Section key={item.id}>
               <Text> { item.text } </Text>
             </Section>

        );
  }

  onTweetDialogClosed(){
    console.log('HOREEEE!')
  }

  postMessage(){
    const { tweet, addMessage } = this.props;
    addMessage(tweet.message);

  }

  renderModal(){
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.tweet.isShowTweetDialog}
          onRequestClose={() => {
                this.onTweetDialogClosed();
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
                    onChangeText={(text) => {
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

  }

  renderAlert(){
    if (this.props.showAlert){
        Alert.alert(
          'Error',
          this.props.tweet.err,
          [
            {text: 'OK', onPress: ()=> this.props.resetError()}
          ]
        );
    }
  }

  render() {
    console.log('home: props:', this.props);
    this.renderAlert();
    return (
      <Layout>


        {this.renderModal()}

        <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={this.props.tweet.refreshTimeline}
                onRefresh={this._onRefresh.bind(this)}
            />}
        >
          {this.renderTimeline()}
        </ScrollView>

      </Layout>
    );


  }
}

const mapStateToProps = ( {tweet} )=> {
  const showAlert = tweet.err != null && tweet.err != '' ;
  return { tweet , showAlert };
}

export default connect(mapStateToProps,
  {
    getUserTimeline,
    showAddTweetDialog,
    messageChanged,
    addMessage,
    resetError
  })(Home);

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
