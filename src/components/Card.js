import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export default function Footer(props) {
  let { children, backgroundColor } = props;
  return (
    <View
      style={[
        s.bg_white,
        s.flx_row,
        s.aic,
        s.jcsb,
        s.pa2,
        s.mb2,
        s.br2,
        {
          height: 50,
          elevation: 4,
          shadowOffset: { width: 3, height: 3 },
          shadowColor: '#dddddd',
          shadowOpacity: 1,
          shadowRadius: 5
        }
      ]}
    >
      {children}
    </View>
  );
}
