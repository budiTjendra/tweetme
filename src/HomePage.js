/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import { getUserTimeline, showAddTweetDialog } from './actions';
import { Layout, Section } from './components/common';
import TweetAddDialog from './components/TweetAddDialog';

class Home extends Component {
  componentDidMount(){
      console.log('home: componentDidMount: ',this.props);
      this.props.getUserTimeline();
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


  render() {
    const { text } = this.props.tweet;
    console.log('home: props:', this.props);
    return (
      <Layout>
          <TweetAddDialog />
        <ScrollView>
          {this.renderTimeline()}
        </ScrollView>

      </Layout>
    );


  }
}

const mapStateToProps = ( {tweet} )=> {
  return { tweet };
}

export default connect(mapStateToProps,
  {
    getUserTimeline,
    showAddTweetDialog
  })(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
