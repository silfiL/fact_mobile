import { StyleSheet } from 'react-native';

import Color from '../../config/Color';
import Size from '../../config/Size';

export const styles = StyleSheet.create({
  navbarRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    width: Size.WIDTH,
    height: Size.HEIGHT*0.08
  },
  toolbarContent: {
    marginTop:Size.HEIGHT*0.08,
    padding:10,
    backgroundColor:Color.LIGHT_GREEN
  },
})