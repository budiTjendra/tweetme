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
  }

  _onRefresh(){

    const { getUserTimeline } = this.props;
    getUserTimeline();
  }

  componentDidMount(){

    const { getUserTimeline, tweet } = this.props;

    console.log('home: componentDidMount: props:',this.props);
    console.log('home: componentDidMount: state:',this.state);

    //only load when user is stil login into the app
    if (this.props.oauth.account != ''){
      getUserTimeline();
    }


  }

  renderTimeline(){
    console.log('test:',this.props.tweet.timeline);
        return this.props.tweet.timeline.map(
           (item, index) =>
             <Section key={item.id}>
               <View style={{ flexDirection: 'row' }}>
                  <View style={{paddingRight:5}}>
                    {this.renderAvatar(item)}
                  </View>

                  <View style={{flex:1}}>
                    { this.renderTweetMessage(item) }
                  </View>
               </View>
             </Section>

        );
  }


  renderTweetLink(item){
    if (item.entities.urls.length === 1){
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

    /*
    if (item.retweeted)
      console.log('test user:',item.retweeted_status.user.name);
    else {
        console.log('test user:',item.user.name);
    }*/

    return (
      <View style={styles.avatarTopStyle}>
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

        <View style={{
          flexDirection: 'row' ,
          paddingTop:10}}>
          { this.renderRetweetCount(item)}
          { this.renderFavoriteCount(item)}
        </View>
      </View>

    );
  }

  renderRetweetCount(item){
    if (item.retweet_count)
      return(
        <Text style={styles.actionIconStyle}>
          <Image
              source={require('../assets/retweet.png')}
              style={{width:14, height:14}}
          />
            &nbsp;{item.retweet_count}
        </Text>
      );
  }

  renderFavoriteCount(item){
    const { favorite_count } = item.retweeted ? item.retweeted_status : item;
    if (favorite_count != 0)
      return(
        <Text style={styles.actionIconStyle}>
            <Image
                source={require('../assets/love_black.png')}
                style={{width:12, height:12 , paddingRight:5}}
            />
                &nbsp;{favorite_count}
        </Text>
      );

  }

  renderAvatar(item){
    const { profile_image_url_https }  = item.retweeted? item.retweeted_status.user : item.user;
    if (item.retweeted){
      return(
        <View>
          <View style={styles.avatarTopStyle}>
            <Image
                source={require('../assets/retweet.png')}
                style={{width:10, height:10 , alignSelf:'flex-end'}}
            />
          </View>

          <Avatar
            small
            rounded
            source={{uri: profile_image_url_https}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
      );

    }
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

const mapStateToProps = ( {tweet , oauth} )=> {
  console.log('home: mapStateToProps: props:', this.props);
  const showAlert = tweet.err != null && tweet.err != '' ;
  return { tweet , showAlert , oauth};
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
  },
  closeIconStyle:{
    width:30,
    height:30
  },
  tweetIconStyle:{
    width:50,
    height:50
  },
  actionIconStyle:{
    marginRight:50
  },
  avatarTopStyle:{
    paddingBottom:5

  }
});
