import React from 'react';
import { Animated, ImageBackground, Platform, View, Text, ListView, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import Color from '../../config/Color'
import Size from '../../config/Size'

import { styles } from './styles'

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const AnimatedListView = Animated.createAnimatedComponent(ListView);

const data = [
  {
    image: 'https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg',
    title: 'Le Brûloir',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/rkTnGunIx/rkTnGunIx-1100-700.jpg',
    title: 'Le Petit Brûloir',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/HknxZ9awg/HknxZ9awg-1100-700.jpg',
    title: 'Oui Mais Non',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'PERKO',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'Perko',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/B1XmNBmLe/B1XmNBmLe-1100-700.jpg',
    title: 'Café Saint-Henri | Marché Jean-Talon',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg',
    title: 'Le Brûloir',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/rkTnGunIx/rkTnGunIx-1100-700.jpg',
    title: 'Le Petit Brûloir',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/HknxZ9awg/HknxZ9awg-1100-700.jpg',
    title: 'Oui Mais Non',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'PERKO',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/merchants/rJWPQ2mKx/rJWPQ2mKx-1100-700.jpg',
    title: 'Perko',
    desc: 'This is just a placeholder short description'
  },
  {
    image: 'https://cdn.th3rdwave.coffee/articles/B1XmNBmLe/B1XmNBmLe-1100-700.jpg',
    title: 'Café Saint-Henri | Marché Jean-Talon',
    desc: 'This is just a placeholder short description'
  },
];

export default class Newsfeed extends React.Component{
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      refreshing: false,
      page: 1,
      articles: [],
      dataSource: dataSource.cloneWithRows(data),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    };

    this.onRefresh = this.onRefresh.bind(this)
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  async onRefresh() {
    this.setState({refreshing: true}) //start rendering spinner
    const response = await fetch(`http://103.252.100.230/fact/member/newsfeed?page=${this.state.page}`)
    const json = await response.json()

    let page = this.state.page
    let articles = this.state.articles
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    page += 1
    articles.push.apply(articles, json.results.articles)
    this.setState({page, articles, dataSource:dataSource.cloneWithRows(articles) })
    this.setState({refreshing: false}) //stop rendering spinner
  }

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
    this.onRefresh()
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _goToView = (id) => {
    this.props.navigation.navigate('ViewArticle', { id })
  }

  _renderRow = (rowData, sectionId, rowId) => {
    return (
      <TouchableOpacity onPress={() => this._goToView(rowData.id)}>
        <View key={rowId} style={styles.card}>
          <ImageBackground style={styles.row} source={{ uri: `http://103.252.100.230/fact/image/${rowData.image}` }} resizeMode="cover">
            <Text style={styles.rowText}>{rowData.title}</Text>
          </ImageBackground>
          <Text style={styles.desc}>{rowData.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.onRefresh()} />
    )
  }

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <AnimatedListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          refreshControl={this._refreshControl()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
        />
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>
            NEWSFEED
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}
