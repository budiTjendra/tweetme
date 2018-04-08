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
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import { getUserTimeline, showAddTweetDialog, addMessageSuccess } from './actions';
import { Layout, Section } from './components/common';
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
    const { getUserTimeline } = this.props;
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
    Alert.alert('closed!');
    console.log('closed')
  }


  render() {
    console.log('home: props:', this.props);
    console.log('home: isLoading', this.props.tweet.loading.isLoading);

    return (
      <Layout>
        <TweetAddDialog }/>

        <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={this.props.tweet.loading.isLoading}
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
