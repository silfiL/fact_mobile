import React from 'react';
import { Text, View } from 'react-native';
import FloatingLabel from 'react-native-floating-labels'

import Color from '../../config/Color'

const FloatingInputField = ({
  name,           // field name - required
  customStyle,
  onChangeText,   // event
  value,          // field value
  placeholder,
  errors,  // this array prop is automatically passed down to this component from <Form />
  keyboardType,
  labelStyle,
  inputStyle,
  password
}) => {
  return (
    <View>
      <FloatingLabel
        value={value && value}
        onChangeText={onChangeText ? (val) => onChangeText(val) : null}
        style={customStyle ? customStyle : {}}
        keyboardType={keyboardType}
        labelStyle={labelStyle ? labelStyle : {}}
        inputStyle={inputStyle? inputStyle : {}}
        password={password}
      >
      {placeholder ? placeholder : ""}
      </FloatingLabel>

      { errors && errors.length > 0 && errors.map((item, index) =>
          item.field === name && item.error ?
            <Text style={{ color: Color.RED, fontWeight: 'bold' }}>
              {item.error}
            </Text>
          : <View />
        )
      }
    </View>
  );
}

export default FloatingInputField;