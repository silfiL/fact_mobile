import { StyleSheet  } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'


export const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: Color.APP_WHITE,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 22,
    color: Color.APP_WHITE,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  btnContainer: {
    justifyContent: 'center',
    height: 45
  },
  btnText: {
    fontFamily: 'SourceSansPro-Bold',
    color: Color.APP_WHITE,
    fontSize: 16
  }
});