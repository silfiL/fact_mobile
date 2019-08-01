import React, { Component } from 'react';
import { Platform, StatusBar, Text, View, ScrollView, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { HeaderBackButton } from '../../components/HeaderBackButton';
import Icon from 'react-native-vector-icons/FontAwesome'
import Color from '../../config/Color'

import { styles } from './styles'

export default class ViewArticle extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: '',
        image: 'https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg',
        author: '',
        content: '',
        published_on: '',
        view: ''
      }

      this.onRefresh = this.onRefresh.bind(this)
    }

    async onRefresh () {
      console.log(this.props.navigation.state.params.id)
      const token = await AsyncStorage.getItem('token');
      const headers = {"Authorization": 'Bearer ' + token}
      const response = await fetch(`http://103.252.100.230/fact/member/article/${this.props.navigation.state.params.id}`,{headers})
      const json = await response.json()
      //console.log("articles json",json.results.view)

      let {title, image, author, content, published_on, view} = this.state
      title = json.results.title
      image = 'http://103.252.100.230/fact/image/' + json.results.image
      author = json.results.author
      content = json.results.content
      published_on = (new Date(json.results.published_on)).datetimeformat(option="date")
      view = json.results.view
      this.setState({title, image, author, content, published_on, view})
    }

    componentWillMount() {
      StatusBar.setBarStyle('light-content');

      if (Platform.OS === 'android') {
          StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
      }
    }

    componentDidMount() {
      this.onRefresh()
    }

    back = () => {
      this.props.navigation.goBack();
    }

    renderContent = () => (
        <ScrollView>
          <View style={styles.viewContent}>
            <Text style={[styles.text,styles.title]}>{this.state.title}</Text>
            <View style={[styles.row,styles.spaceBetween,styles.below]}>
              <Text style={styles.text}>By : {this.state.author}</Text>
              <Text style={styles.text}>{this.state.published_on}</Text>
            </View>
            <View style={[styles.row,styles.below]}>
              <Text style={styles.paragraph}>{this.state.content}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="group" size={16} color={Color.FONT_GREY} />
              <Text style={[styles.text,styles.left]}>{this.state.view} views</Text>
            </View>
          </View>
        </ScrollView>
    );

    renderNavBar = () => (
        <HeaderBackButton title="View Article" iconColor={Color.APP_WHITE} onPressBack={this.back}/>
    );

    render() {
        return (
          <CollapsibleToolbar
                onContentScroll={this.onContentScroll}
                renderContent={this.renderContent}
                renderNavBar={this.renderNavBar}
                imageSource={this.state.image}
                collapsedNavBarBackgroundColor={Color.YELLOW}
                translucentStatusBar
                showsVerticalScrollIndicator={false}
            />
        );
    }
}
