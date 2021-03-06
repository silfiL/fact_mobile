import React from 'react';
import { TextInput, Text, View } from 'react-native';

import Color from '../../config/Color'

const InputField = ({
  name,           // field name - required
  customStyle,
  onChangeText,   // event
  value,          // field value
  disabled,
  placeholder,
  errors,
  keyboardType         // this array prop is automatically passed down to this component from <Form />
}) => {
  return (
    <View>
      <TextInput
        value={value && value}
        onChangeText={onChangeText ? (val) => onChangeText(val) : null}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
        style={customStyle ? customStyle : {}}
        keyboardType={keyboardType}
      />

      { errors && errors.length > 0 && errors.map((item, index) =>
          item.field === name && item.error ?
            <Text style={{ color: Color.RED, fontWeight: 'bold', fontSize: 12 }}>
              {item.error}
            </Text>
          : <View />
        )
      }
    </View>
  );
}

export default InputField;