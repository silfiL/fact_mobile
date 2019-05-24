import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

const Title = ({size}) => {
  let titleStyles
  if (size == "large")
    titleStyles = styles.title
  else
    titleStyles = styles.smallTitle
  return (
  <Text style={titleStyles}>FACT</Text>
  )
}

export default Title;