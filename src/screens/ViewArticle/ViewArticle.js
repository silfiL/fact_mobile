import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome'
import Color from '../../config/Color'
import Size from '../../config/Size'
//import { styles } from './styles'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Color.YELLOW}
        />
        <ParallaxScrollView
          windowHeight={Size.HEIGHT4}
          backgroundSource={require('../../assets/img/cat.jpg')}
          navBarTitle='ARTICLE TITLE'
          navBarTitleColor={Color.APP_WHITE}
          navBarColor={Color.YELLOW}
          headerView={(
            <View>
              <Image source={require('../../assets/img/cat.jpg')} style={{width:Size.WIDTH,height:Size.HEIGHT4,marginTop:-Size.HEIGHT1}} />
            </View>
          )}
          leftIcon={{name: 'md-arrow-round-back', color: Color.APP_WHITE, size: 30, type: 'ionicon'}}
          leftIconOnPress={this.goBack}
        >
        {/*<Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >*/}
        <ScrollView>
          <View style={styles.scrollViewContent}>
          <Text>TITLE</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>By : Author Name</Text>
            <Text>Monday, 6 May 2019</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue vehicula justo id gravida. Fusce dignissim venenatis fermentum. Sed porttitor viverra felis sit amet viverra. Sed sollicitudin ultrices fringilla. Nullam et nibh egestas, pellentesque diam ac, vestibulum nulla. Maecenas maximus felis turpis, quis vehicula massa mollis facilisis. Ut cursus, nulla vel lacinia tristique, augue purus luctus enim, eget hendrerit neque sapien eu est. Ut dictum mattis urna quis varius. Maecenas facilisis congue leo, ut euismod erat finibus a. Ut facilisis tempus odio, eget tristique sem interdum sed. Vestibulum ornare id augue quis vestibulum. Integer pulvinar ex vel purus aliquet, ac vehicula elit tempus.

Quisque elementum, augue quis interdum fringilla, quam augue hendrerit mi, eu egestas risus libero in nisi. Aliquam erat volutpat. Fusce semper euismod posuere. Cras lacinia luctus placerat. Aenean lacinia massa est, non vehicula nisi porta non. Vivamus non nisl placerat, euismod lacus ut, dictum ex. Nunc quam massa, cursus sed venenatis eget, sagittis in sem. Phasellus nibh eros, molestie quis ante sit amet, congue facilisis purus.

Nulla sagittis metus risus, et pellentesque dui varius quis. Nullam gravida diam lacinia nunc mollis, id varius elit posuere. Suspendisse potenti. Suspendisse tincidunt, ex vitae tincidunt tempor, nisl felis dapibus odio, sit amet facilisis odio risus facilisis arcu. Sed faucibus, ligula eu gravida iaculis, erat metus eleifend dui, at lacinia ligula sapien in est. Mauris ultricies tortor condimentum tellus auctor maximus. Ut quis pretium quam. Suspendisse urna ipsum, ultricies vitae risus at, finibus tempor lectus. Mauris sollicitudin est posuere pretium pharetra. Ut id ligula quis sapien tincidunt porta. Aenean pretium nunc id magna gravida consequat. Morbi efficitur hendrerit posuere. Aliquam erat volutpat. Vivamus sit amet accumsan ex.

Sed consectetur, leo eu sagittis vulputate, velit ipsum dictum sapien, nec dictum tellus ligula vel leo. Duis vitae tellus eu sapien bibendum hendrerit. Curabitur hendrerit auctor cursus. Donec augue mi, hendrerit eu malesuada quis, efficitur vitae metus. Nunc tempus eget ex nec fermentum. In hac habitasse platea dictumst. Suspendisse purus quam, ultricies vel ex ut, pulvinar rutrum dolor. Aliquam rhoncus efficitur viverra. Aliquam id turpis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper sit amet nibh sit amet dignissim. Aenean vestibulum enim libero, in sagittis tortor pellentesque at.

Cras congue maximus quam in elementum. Nam lectus felis, viverra ac ipsum a, semper vulputate mi. Vestibulum sit amet ornare enim, nec scelerisque augue. Vivamus a facilisis neque. Duis et blandit justo. Fusce facilisis dolor nunc, a aliquam nisi semper sed. Nullam vel turpis eu urna luctus dictum in nec lorem. Sed eget varius ipsum. Quisque in tincidunt nibh. Integer lobortis tristique nisl eu cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean ut efficitur eros, sit amet pulvinar massa. Ut venenatis finibus urna sit amet sagittis.</Text>
          
          </View>
          <View style={styles.row}>
            <Icon name="group" size={16} />
            <Text>30 views</Text>
          </View>
        </View>
        </ScrollView>
        </ParallaxScrollView>
        {/*<Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../../assets/img/cat.jpg')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Text style={styles.title}>VIEW ARTICLE</Text>
        </Animated.View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    //paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY
  }
});