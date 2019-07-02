import React from 'react'
import { View, Text } from 'react-native'
import Wave from 'react-native-waveview'

import { styles } from './styles'
import Color from '../../config/Color'

const WaveProgress = ({percent,type, waveRef}) => {
  let primary;
  let secondary;
  let textStyle;
  if (type == "carbohydrate"){
    primary = Color.LIGHT_RED,
    secondary = Color.RED,
    textStyle = [styles.percent,styles.red]
  } else if (type == "protein"){
    primary = Color.LIGHT_YELLOW,
    secondary = Color.YELLOW,
    textStyle = [styles.percent,styles.yellow]
  } else {
    primary = Color.LIGHT_BLUE,
    secondary = Color.BLUE,
    textStyle = [styles.percent,styles.green]
  }

  return(
    <View style={styles.bigCircle}>
      <Text style={textStyle}>{percent} %</Text>
      <Wave
          ref={ref => waveRef(ref, type)}
          style={styles.waveBall}
          H={percent}
          waveParams={[
              {A: 10, T: 180, fill: primary},
              {A: 15, T: 140, fill: secondary},
              {A: 20, T: 100, fill: primary},
          ]}
          animated={true}
      />
      </View>
  )
}

export default WaveProgress;
