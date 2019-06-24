import React from 'react';
import { Animated, ImageBackground, Platform, StyleSheet, View, Text, ListView, TouchableOpacity, StatusBar } from 'react-native';
import Color from '../../config/Color'
import Size from '../../config/Size'

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
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

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

  _goToView = () => {
    this.props.navigation.navigate('ViewArticle')
  }

  _renderRow = (rowData, sectionId, rowId) => {
    return (
      <TouchableOpacity onPress={this._goToView}>
        <View key={rowId} style={styles.card}>
          <ImageBackground style={styles.row} source={{ uri: rowData.image }} resizeMode="cover">
            <Text style={styles.rowText}>{rowData.title}</Text>
          </ImageBackground>
          <Text style={styles.desc}>{rowData.desc}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <AnimatedListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
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

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Color.YELLOW,
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    //paddingTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    color: Color.APP_WHITE,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: (Size.HEIGHT*0.08)*0.35
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowText: {
    color: 'white',
    fontSize: 18,
  },
  card: {
    margin: Size.WIDTH1*0.2,
    marginBottom: Size.HEIGHT1*0.3,
    paddingBottom: Size.HEIGHT1*0.2,
    borderColor: Color.LIGHT_GREY,
    borderWidth: 1,
  },
  desc: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY,
    padding: Size.WIDTH1*0.2
  }
});