import { StyleSheet, Platform} from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: Color.APP_WHITE
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
    height: Size.HEIGHT*0.08,
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
    padding: Size.WIDTH1*0.2,
    height: 100
  }
});
