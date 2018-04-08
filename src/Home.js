/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import { getUserTimeline } from './actions';

class Home extends Component {
  componentDidMount(){
      console.log('home: componentDidMount',this.props.getUserTimeline());

      //this.props.getUserTimeline();
  }

  renderTimeline(){
     return this.props.tweet.timeline.map(
       item => <Text> { item.text } </Text>
     );
  }

  render() {
    const { text } = this.props.tweet;
    console.log('home: props:', this.props);
    console.log('home: text:', text);


    return (
      <View>
        {this.renderTimeline()}
      </View>
    );


  }
}

const mapStateToProps = ( {tweet} )=> {
  return { tweet };
}

export default connect(mapStateToProps, {getUserTimeline})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
