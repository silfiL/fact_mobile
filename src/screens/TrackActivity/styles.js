import { StyleSheet } from 'react-native'
import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerCont: {
    alignItems:'center',
    justifyContent:'center',
    flex: 1
  },
  text: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 20,
    color: Color.APP_WHITE,
    alignSelf: 'center'
  }, 
  below: {
    marginBottom: Size.HEIGHT2
  },
  list: {
    flexGrow: 0,
    borderColor: Color.APP_WHITE,
    borderRadius: 20,
    borderWidth: 1,
    paddingBottom: Size.WIDTH1*0.2,
    paddingHorizontal: Size.WIDTH1*0.1,
    marginBottom: Size.HEIGHT1*0.2
  },
  smallerBelow: {
    marginBottom: Size.HEIGHT1*0.5
  }
})