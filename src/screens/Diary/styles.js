import { StyleSheet } from 'react-native';

import Color from '../../config/Color';
import Size from '../../config/Size';

export const styles = StyleSheet.create({
  navbarRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    width: Size.WIDTH,
    height: Size.HEIGHT*0.08,
    backgroundColor: Color.GREEN,
  },
  toolbarContent: {
    padding: Size.WIDTH1*0.3,
    paddingTop: Size.HEIGHT1
  },
  roundedRect: {
    padding: Size.WIDTH1*0.1,
    borderColor: Color.APP_WHITE,
    borderRadius: 15,
    borderWidth: 1
  },
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical: Size.HEIGHT1*0.2
  },
  center: {
    alignItems: 'center',
  },
  verticalSeperator: {
    backgroundColor: Color.APP_WHITE,
    width: 1,
    height: Size.HEIGHT2,
  },
  points: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    color: Color.APP_WHITE,
  },
  kcal: {
    fontSize: 14,
  },  
  label: {
    fontFamily: 'SourceSansPro-Bold',
    color: Color.APP_WHITE,
    marginBottom: Size.HEIGHT1*0.15
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.APP_WHITE
  },
  nutrientRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  scrollViewContent: {
    flexGrow: 1,
    flex: 1,
    marginTop: Size.HEIGHT1*0.2
  },
  dateInput: {
    borderColor:'transparent'
  },
  dateText: {
    fontFamily:'SourceSansPro-Regular',
    color:Color.APP_WHITE,
    fontSize: 20
  },
})
