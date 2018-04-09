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
  TextInput,
  Image,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import OAuthManager from 'react-native-oauth';
import Moment from 'moment';
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

    const { getUserTimeline, tweet } = this.props;

    console.log('home: componentDidMount: props:',this.props);

    this.setState({users: this.props.tweet.timeline.user});
    console.log('home: componentDidMount: state:',this.state);

    getUserTimeline();

  }

  renderTimeline(){
    console.log('test:',this.props.tweet.timeline);
        return this.props.tweet.timeline.map(
           (item, index) =>
             <Section key={item.id}>
               <View style={{ flexDirection: 'row' , alignItems:'center'}}>

                  {this.renderAvatar(item)}

                  <View style={{flex:1}}>
                    { this.renderTweetMessage(item) }
                  </View>

               </View>

             </Section>

        );
  }


  renderTweetLink(item){
    console.log(item.entities.urls.length);
    if (item.entities.urls.length === 1){
      console.log('rendering');

      return (
        <TouchableHighlight onPress={() => Linking.openURL(item.entities.urls[0].expanded_url)}  >
          <Text style={{color:'blue'}}>{item.entities.urls[0].display_url}</Text>
        </TouchableHighlight>
      );

    }

  }

  renderTweetMessage(item){
    const { text, created_at} = item.retweeted ? item.retweeted_status : item;
    const { name, screen_name } = item.retweeted ? item.retweeted_status.user : item.user;

    if (item.retweeted)
      console.log('test user:',item.retweeted_status.user.name);
    else {
        console.log('test user:',item.user.name);
    }

    return (
      <View style={{paddingLeft: 10 }}>
        { this.renderRetweetedFlag(item) }
        <View style={{ flexDirection: 'row'}}>
          <Text>{name}</Text>
          <Text style={{color:'gray'}}>@{screen_name}</Text>
          <Text style={{color:'gray', fontSize: 13}}> . {Moment(created_at).format('DD/MM/YYYY')}</Text>
        </View>
        <Text>{text}</Text>

        <View style={{paddingTop:10}}>
          { this.renderTweetLink(item) }
        </View>

        <View style={{ flexDirecton:'row', justifyContent:'space-around' }}>
          { this.renderRetweetCount(item)}
        </View>
      </View>

    );
  }

  renderRetweetCount(item){
    if (item.retweet_count)
      return(<Text>R:{item.retweet_count}</Text>);
  }

  renderAvatar(item){
    const { profile_image_url_https }  = item.retweeted? item.retweeted_status.user : item.user;
    return(
      <Avatar
        small
        rounded
        source={{uri: profile_image_url_https}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
    );
  }

  renderRetweetedFlag(item){
     if (item.retweeted)
      return (<Text style={{color:'gray', fontSize:10}}>You Retweeted</Text>);
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
                  <Button onPress={ () => {this.props.showAddTweetDialog(false)} }>
                      <Image
                        source={require('../assets/exit_icon.png')}
                        style={styles.closeIconStyle}
                      />
                  </Button>
                  <Button onPress={this.postMessage.bind(this) }>
                      <Image
                        source={require('../assets/add_tweet.png')}
                        style={styles.closeIconStyle}
                      />
                  </Button>
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

    Moment.locale('en');
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
  console.log('home: mapStateToProps: props:', this.props);
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
    backgroundColor:'white',
    marginTop:5
  },
  actionBarStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIconStyle:{
    width:30,
    height:30
  },
  tweetIconStyle:{
    width:50,
    height:50
  }
});
