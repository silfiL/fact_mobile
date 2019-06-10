import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

const Title = ({size, titleColor}) => {
  let titleStyles, colorStyles
  if (size == "large")
    titleStyles = styles.title
  else
    titleStyles = styles.smallTitle
  if (titleColor)
    colorStyles = {color: titleColor}
  else
    colorStyles = null
  return (
  <Text style={[titleStyles,colorStyles]}>FACT</Text>
  )
}

export default Title;