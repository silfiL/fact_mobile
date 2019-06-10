import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles'

const Footer = ({color}) => {
  let colorStyles
  if (color)
    colorStyles = {color: color}
  else
    colorStyles = null
  return(
     <Text style={[styles.footer,colorStyles]}>Copyright by Zro2iro</Text>
)}

export default Footer;