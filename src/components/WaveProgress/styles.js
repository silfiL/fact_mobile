import { StyleSheet } from 'react-native'

import Color from '../../config/Color';

export const styles = StyleSheet.create({
  bigCircle: {
    borderRadius:50,
    width: 100,
    height: 100,
    backgroundColor:Color.LIGHTER_GREY,
    alignItems:'center',
    justifyContent:'center'
  },
  percent: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 18,
    position: 'absolute',
    color: Color.FONT_GREY,
    zIndex: 1,
  },
  red: {
    color: Color.RED,
  },
  yellow: {
    color: Color.YELLOW,
  },
  green: {
    color: Color.BLUE
  },
  waveBall: {
      width: 100,
      aspectRatio: 1,
      borderRadius: 50,
      overflow: 'hidden',
  },
  display: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.APP_WHITE,
    fontSize: 13,
    marginVertical: 5,
    alignSelf: 'center'
  }
})