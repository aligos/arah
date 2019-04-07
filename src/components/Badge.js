import React from 'react';
import { View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export default function Badge(props) {
  let { children, backgroundColor } = props;
  return (
    <View
      style={[
        s.flx_column,
        s.aic,
        s.jcsb,
        s.pa3,
        s.mb2,
        s.br2,
        {
          backgroundColor,
          height: 160,
          width: 120,
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
